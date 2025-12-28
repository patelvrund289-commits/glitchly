'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createMatch, makeMove, getMatchState } from '@/app/actions/playerActions';

type Player = 'X' | 'O' | null;
type Board = Player[];

export default function MultiplayerTicTacToePage() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameStatus, setGameStatus] = useState<'waiting' | 'active' | 'finished'>('waiting');
  const [winner, setWinner] = useState<Player>(null);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O' | null>(null);
  const [opponentName, setOpponentName] = useState<string>('');
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (matchId) {
      const interval = setInterval(async () => {
        try {
          const state = await getMatchState(matchId);
          setBoard(state.board);
          setCurrentPlayer(state.currentPlayer);
          setGameStatus(state.status);
          setWinner(state.winner);
          setIsMyTurn(state.currentPlayer === playerSymbol && state.status === 'active');
        } catch (err) {
          // Silent rejection
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [matchId, playerSymbol]);

  const handleCreateMatch = async (opponentId: string) => {
    try {
      setError('');
      const match = await createMatch(opponentId);
      setMatchId(match.id);
      setBoard(match.board as Board);
      setCurrentPlayer(match.currentPlayer as 'X' | 'O');
      setGameStatus('active');
      setPlayerSymbol('X');
      setIsMyTurn(true);
      setOpponentName('Opponent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create match');
    }
  };

  const handleCellClick = async (index: number) => {
    if (!matchId || !isMyTurn || board[index] !== null || gameStatus !== 'active') return;

    try {
      setError('');
      const result = await makeMove(matchId, index);
      if (result) {
        setBoard(result.board);
        setGameStatus(result.status as 'active' | 'finished');
        setWinner(result.winner as Player);
        setIsMyTurn(false);
      }
    } catch (err) {
      // Silent rejection
    }
  };

  const renderCell = (index: number) => {
    const cellValue = board[index];
    return (
      <button
        key={index}
        onClick={() => handleCellClick(index)}
        className="w-20 h-20 md:w-24 md:h-24 bg-white/10 border-2 border-white/20 rounded-lg text-4xl md:text-5xl font-bold text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:cursor-not-allowed"
        disabled={!isMyTurn || cellValue !== null || gameStatus !== 'active'}
      >
        {cellValue}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            MULTIPLAYER TIC TAC TOE
          </h1>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {gameStatus === 'waiting' && (
          <div className="text-center mb-8">
            <p className="text-white mb-4">Enter opponent ID to start a match:</p>
            <input
              type="text"
              placeholder="Opponent ID"
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
              onChange={(e) => setOpponentName(e.target.value)}
            />
            <button
              onClick={() => handleCreateMatch(opponentName)}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
            >
              Start Match
            </button>
          </div>
        )}

        {gameStatus !== 'waiting' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className={`text-xl font-semibold ${isMyTurn && currentPlayer === playerSymbol ? 'text-blue-400' : 'text-white'}`}>
                You ({playerSymbol})
              </div>
              <div className="text-white">vs</div>
              <div className={`text-xl font-semibold ${!isMyTurn && currentPlayer !== playerSymbol ? 'text-red-400' : 'text-white'}`}>
                {opponentName} ({playerSymbol === 'X' ? 'O' : 'X'})
              </div>
            </div>

            <div className="text-center mb-8">
              {gameStatus === 'finished' ? (
                <div className="text-2xl md:text-3xl font-bold">
                  {winner ? (
                    <span className={winner === playerSymbol ? 'text-green-400' : 'text-red-400'}>
                      {winner === playerSymbol ? 'You Win!' : 'You Lose!'} 🎉
                    </span>
                  ) : (
                    <span className="text-yellow-400">It's a Draw! 🤝</span>
                  )}
                </div>
              ) : (
                <div className="text-xl md:text-2xl font-semibold text-white">
                  {isMyTurn ? 'Your Turn' : 'Waiting for opponent...'}
                </div>
              )}
            </div>

            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {Array.from({ length: 9 }, (_, index) => renderCell(index))}
              </div>
            </div>
          </>
        )}

        <div className="text-center">
          <Link
            href="/games"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Games Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
