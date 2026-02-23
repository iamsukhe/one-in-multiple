import React from "react";
import { Link } from "react-router-dom";

// Your Game Database
const gameCatalog = [
  // --- The Starter Classics ---
  { id: "tic-tac-toe", title: "Tic-Tac-Toe", emoji: "❌⭕" },
  { id: "rock-paper-scissors", title: "Roshambo", emoji: "✊✋✌️" },
  { id: "simon-says", title: "Simon Says", emoji: "🔴🟢🔵🟡" },

  // --- Action & Arcade ---
  { id: "whack-a-mole", title: "Whack-a-Mole", emoji: "🔨" },
  { id: "snake", title: "Retro Snake", emoji: "🐍" },
  { id: "pong", title: "Pong", emoji: "🏓" },
  { id: "breakout", title: "Brick Breaker", emoji: "🧱" },
  { id: "flappy-clone", title: "Flappy Dodge", emoji: "🐦" },

  // --- Puzzle & Logic ---
  { id: "memory-match", title: "Memory Match", emoji: "🎴" },
  { id: "2048", title: "2048 Merge", emoji: "🧩" },
  { id: "minesweeper", title: "Minesweeper", emoji: "💣" },
  { id: "connect-four", title: "Connect 4", emoji: "🔴🟡" },
  { id: "sudoku", title: "Sudoku", emoji: "🔢" },

  // --- Word & Trivia ---
  { id: "word-guess", title: "Wordle Clone", emoji: "🟩🟨⬜" },
  { id: "hangman", title: "Hangman", emoji: "🎈" },
  { id: "typing-test", title: "Speed Typer", emoji: "⌨️" },
  { id: "math-quiz", title: "Math Blaster", emoji: "➕➖" },
  { id: "trivia", title: "Pub Trivia", emoji: "🧠" },

  // --- Mini Utilities / Toys ---
  { id: "reaction-timer", title: "Reaction Test", emoji: "⏱️" },
  { id: "magic-8-ball", title: "Magic 8-Ball", emoji: "🎱" },
  { id: "dice-roller", title: "Dice Roller", emoji: "🎲" },
];

export default function MainMenu() {
  return (
    <div className="arcade-menu">
      <h1 className="arcade-title">99-IN-1 ARCADE</h1>

      <Link to="/about" className="about-link">
        Insert Coin (About)
      </Link>

      <div className="game-grid">
        {gameCatalog.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id} className="game-card">
            <div className="game-emoji">{game.emoji}</div>
            <h3 className="game-title">{game.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
