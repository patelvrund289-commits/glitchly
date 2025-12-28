'use server';

import { db } from '@/lib/db';
import { users, matches } from '@/lib/schema';
import { eq, or } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function getUserStats() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const user = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);
  if (!user[0]) throw new Error('User not found');

  return {
    userId: user[0].id,
    username: user[0].username,
    points: user[0].points,
    wins: user[0].wins,
    losses: user[0].losses,
    draws: user[0].draws,
  };
}

export async function getMatchHistory() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const userMatches = await db.select({
    id: matches.id,
    opponent: users.username,
    result: matches.result,
    date: matches.createdAt,
  }).from(matches)
  .innerJoin(users, or(eq(matches.player1Id, session.user.id), eq(matches.player2Id, session.user.id)))
  .where(or(eq(matches.player1Id, session.user.id), eq(matches.player2Id, session.user.id)))
  .orderBy(matches.createdAt);

  return userMatches.map(match => ({
    id: match.id,
    opponent: match.opponent,
    result: match.result as 'win' | 'loss' | 'draw',
    date: match.date.toISOString(),
  }));
}

export async function createMatch(opponentId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const [currentUser, opponent] = await Promise.all([
    db.select().from(users).where(eq(users.id, session.user.id)).limit(1),
    db.select().from(users).where(eq(users.id, opponentId)).limit(1),
  ]);

  if (!currentUser[0]) throw new Error('User not found');
  if (!opponent[0]) throw new Error('Opponent not found');
  if (currentUser[0].points <= 0) throw new Error('Not enough points to play');
  if (opponent[0].points <= 0) throw new Error('Opponent has no points');

  const newMatch = await db.insert(matches).values({
    player1Id: session.user.id,
    player2Id: opponentId,
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'active',
  }).returning();

  return {
    id: newMatch[0].id,
    board: newMatch[0].board,
    currentPlayer: newMatch[0].currentPlayer,
    status: newMatch[0].status,
  };
}

export async function makeMove(matchId: string, position: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const match = await db.select().from(matches).where(eq(matches.id, matchId)).limit(1);
  if (!match[0]) throw new Error('Match not found');
  if (match[0].status !== 'active') return null; // Silent rejection

  const isPlayer1 = match[0].player1Id === session.user.id;
  const isPlayer2 = match[0].player2Id === session.user.id;
  if (!isPlayer1 && !isPlayer2) return null; // Silent rejection

  const playerSymbol = isPlayer1 ? 'X' : 'O';
  if (match[0].currentPlayer !== playerSymbol) return null; // Silent rejection

  const board = match[0].board as (string | null)[];
  if (board[position] !== null) return null; // Silent rejection

  board[position] = playerSymbol;

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  let winner = null;
  for (const combo of winningCombinations) {
    if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
      winner = board[combo[0]];
      break;
    }
  }

  const isDraw = !winner && board.every(cell => cell !== null);
  const status = winner || isDraw ? 'finished' : 'active';
  const result = winner === playerSymbol ? 'win' : winner ? 'loss' : 'draw';

  await db.update(matches).set({
    board,
    currentPlayer: status === 'active' ? (playerSymbol === 'X' ? 'O' : 'X') : match[0].currentPlayer,
    status,
    winner,
    result,
    updatedAt: new Date(),
  }).where(eq(matches.id, matchId));

  if (status === 'finished') {
    const [player1, player2] = await Promise.all([
      db.select().from(users).where(eq(users.id, match[0].player1Id)).limit(1),
      db.select().from(users).where(eq(users.id, match[0].player2Id)).limit(1),
    ]);

    if (result === 'win') {
      await db.update(users).set({
        points: player1[0].points + 1,
        wins: player1[0].wins + 1,
      }).where(eq(users.id, match[0].player1Id));
      await db.update(users).set({
        points: player2[0].points - 1,
        losses: player2[0].losses + 1,
      }).where(eq(users.id, match[0].player2Id));
    } else if (result === 'loss') {
      await db.update(users).set({
        points: player1[0].points - 1,
        losses: player1[0].losses + 1,
      }).where(eq(users.id, match[0].player1Id));
      await db.update(users).set({
        points: player2[0].points + 1,
        wins: player2[0].wins + 1,
      }).where(eq(users.id, match[0].player2Id));
    } else {
      await db.update(users).set({
        draws: player1[0].draws + 1,
      }).where(eq(users.id, match[0].player1Id));
      await db.update(users).set({
        draws: player2[0].draws + 1,
      }).where(eq(users.id, match[0].player2Id));
    }
  }

  return {
    board,
    status,
    winner,
  };
}

export async function getMatchState(matchId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const match = await db.select().from(matches).where(eq(matches.id, matchId)).limit(1);
  if (!match[0]) throw new Error('Match not found');

  const isPlayer1 = match[0].player1Id === session.user.id;
  const isPlayer2 = match[0].player2Id === session.user.id;
  if (!isPlayer1 && !isPlayer2) throw new Error('Not a player in this match');

  return {
    board: match[0].board,
    currentPlayer: match[0].currentPlayer,
    status: match[0].status,
    winner: match[0].winner,
  };
}
