'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Player = 'X' | 'O' | null;
type Board = Player[];
type GameMode = 'single' | 'multi';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

function checkWinner(board: Board): Player {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function isBoardFull(board: Board): boolean {
  return board.every(cell => cell !== null);
}

function minimax(board: Board, depth: number, isMaximizing: boolean): number {
  const winner = checkWinner(board);

  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (isBoardFull(board)) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const evaluation = minimax(board, depth + 1, false);
        board[i] = null;
        maxEval = Math.max(maxEval, evaluation);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const evaluation = minimax(board, depth + 1, true);
        board[i] = null;
        minEval = Math.min(minEval, evaluation);
      }
    }
    return minEval;
  }
}

function getBestMove(board: Board): number {
  let bestMove = -1;
  let bestValue = -Infinity;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const moveValue = minimax(board, 0, false);
      board[i] = null;

      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

export default function TicTacToePage() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameMode, setGameMode] = useState<GameMode>('single');
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setIsGameOver(false);
    setIsAiThinking(false);
  };

  const makeMove = (index: number, player: 'X' | 'O') => {
    if (board[index] !== null || isGameOver) return false;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    const draw = isBoardFull(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      setIsGameOver(true);
      return true;
    } else if (draw) {
      setIsDraw(true);
      setIsGameOver(true);
      return true;
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      return true;
    }
  };

  const handleCellClick = (index: number) => {
    if (isGameOver || isAiThinking) return;

    if (gameMode === 'single') {
      if (currentPlayer === 'X') {
        makeMove(index, 'X');
      }
    } else {
      makeMove(index, currentPlayer);
    }
  };

  useEffect(() => {
    if (gameMode === 'single' && currentPlayer === 'O' && !isGameOver && !isAiThinking) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove !== -1) {
          makeMove(bestMove, 'O');
        }
        setIsAiThinking(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, board, isGameOver, isAiThinking]);

  const renderCell = (index: number) => {
    const cellValue = board[index];
    return (
      <button
        key={index}
        onClick={() => handleCellClick(index)}
        className="w-20 h-20 md:w-24 md:h-24 bg-white/10 border-2 border-white/20 rounded-lg text-4xl md:text-5xl font-bold text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:cursor-not-allowed"
        disabled={cellValue !== null || isGameOver || isAiThinking}
      >
        {cellValue}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            ❌⭕ TIC TAC TOE
          </h1>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => {
                setGameMode('single');
                resetGame();
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                gameMode === 'single'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Single Player
            </button>
            <button
              onClick={() => {
                setGameMode('multi');
                resetGame();
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                gameMode === 'multi'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Multiplayer
            </button>
          </div>
        </div>

        {/* Game Status */}
        <div className="text-center mb-8">
          {isGameOver ? (
            <div className="text-2xl md:text-3xl font-bold">
              {winner ? (
                <span className={winner === 'X' ? 'text-blue-400' : 'text-red-400'}>
                  {winner === 'X' ? 'Player X' : gameMode === 'single' ? 'AI' : 'Player O'} Wins! 🎉
                </span>
              ) : (
                <span className="text-yellow-400">It's a Draw! 🤝</span>
              )}
            </div>
          ) : (
            <div className="text-xl md:text-2xl font-semibold text-white">
              {gameMode === 'single' ? (
                currentPlayer === 'X' ? 'Your Turn (X)' : 'AI Thinking... 🤖'
              ) : (
                `Player ${currentPlayer}'s Turn`
              )}
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {Array.from({ length: 9 }, (_, index) => renderCell(index))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center mb-8">
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            🔄 New Game
          </button>
        </div>

        {/* Back to Games */}
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
