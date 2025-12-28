'use server';

import { db } from '@/lib/db';
import { users, adminLogs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { isAdmin } from '@/lib/auth';

export async function getPlayersForGame(game: string) {
  const session = await auth();
  if (!(await isAdmin(session?.user?.id))) throw new Error('Unauthorized');

  // For now, only Tic Tac Toe, but extensible
  if (game !== 'tic-tac-toe') throw new Error('Invalid game');

  return await db.select({
    id: users.id,
    username: users.username,
    points: users.points,
    wins: users.wins,
    losses: users.losses,
    draws: users.draws,
  }).from(users).where(eq(users.role, 'player'));
}

export async function adjustPlayerPoints(adminId: string, playerId: string, pointsChange: number, reason: string) {
  if (!(await isAdmin(adminId))) throw new Error('Unauthorized');

  const player = await db.select().from(users).where(eq(users.id, playerId)).limit(1);
  if (!player[0]) throw new Error('Player not found');

  const newPoints = Math.max(0, player[0].points + pointsChange);

  await db.update(users).set({ points: newPoints }).where(eq(users.id, playerId));

  await db.insert(adminLogs).values({
    adminId,
    playerId,
    pointsChanged: pointsChange,
    reason,
  });

  return { newPoints };
}

export async function resetPlayerPoints(adminId: string, playerId: string, reason: string) {
  if (!(await isAdmin(adminId))) throw new Error('Unauthorized');

  await db.update(users).set({ points: 10 }).where(eq(users.id, playerId));

  await db.insert(adminLogs).values({
    adminId,
    playerId,
    pointsChanged: 10,
    reason,
  });

  return { newPoints: 10 };
}
