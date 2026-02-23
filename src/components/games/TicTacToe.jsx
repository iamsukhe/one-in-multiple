import React, { useState } from "react";
import GameWrapper from "../../components/GameWrapper";
import Button from "../../components/Button";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Cols
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleClick = (index) => {
    // If square is filled or game over, do nothing
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <GameWrapper title="Tic-Tac-Toe">
      <div
        style={{ textAlign: "center" }}
        className={winner || isDraw ? "game-over" : ""}
      >
        <h3 className="game-status">
          {winner
            ? `Winner: ${winner} 🎉`
            : isDraw
              ? "It's a Draw! 🤝"
              : `Next Player: ${xIsNext ? "X" : "O"}`}
        </h3>

        <div className="tic-tac-toe-board">
          {board.map((cell, index) => {
            // This creates the class string "tic-tac-toe-cell x" or "tic-tac-toe-cell o"
            const cellClass = cell
              ? `tic-tac-toe-cell ${cell.toLowerCase()}`
              : "tic-tac-toe-cell";

            return (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={cellClass}
              >
                {cell}
              </div>
            );
          })}
        </div>

        <Button onClick={resetGame}>Restart Game</Button>
      </div>
    </GameWrapper>
  );
}
