import React, { useState, useEffect } from "react";
import GameWrapper from "../../components/GameWrapper";
import Button from "../../components/Button";

// Game Constants
const BOARD_WIDTH = 600;
const BOARD_HEIGHT = 400;
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 15;

export default function Pong() {
  const [gameState, setGameState] = useState({
    ball: { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2, dx: 4, dy: 4 },
    playerY: BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    cpuY: BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    score: { player: 0, cpu: 0 },
    isPlaying: false,
  });

  // 1. The Game Loop (Physics & Collisions)
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        let { ball, cpuY, score } = prev;
        let newBall = { ...ball };
        let newCpuY = cpuY;
        let newScore = { ...score };
        let isPlayingNow = true;

        // Move the ball
        newBall.x += newBall.dx;
        newBall.y += newBall.dy;

        // Top & Bottom Wall Collisions
        if (newBall.y <= 0 || newBall.y + BALL_SIZE >= BOARD_HEIGHT) {
          newBall.dy *= -1; // Reverse Y direction
        }

        // CPU AI Logic (Follow the ball)
        const cpuCenter = newCpuY + PADDLE_HEIGHT / 2;
        if (cpuCenter < newBall.y - 10) newCpuY += 4; // Move Down
        if (cpuCenter > newBall.y + 10) newCpuY -= 4; // Move Up
        newCpuY = Math.max(0, Math.min(BOARD_HEIGHT - PADDLE_HEIGHT, newCpuY)); // Keep on screen

        // Paddle Collisions
        // Player (Left Side)
        if (
          newBall.x <= 20 + PADDLE_WIDTH &&
          newBall.y + BALL_SIZE >= prev.playerY &&
          newBall.y <= prev.playerY + PADDLE_HEIGHT
        ) {
          newBall.dx = Math.abs(newBall.dx) + 0.5; // Bounce right & speed up slightly
        }

        // CPU (Right Side)
        if (
          newBall.x + BALL_SIZE >= BOARD_WIDTH - 20 - PADDLE_WIDTH &&
          newBall.y + BALL_SIZE >= newCpuY &&
          newBall.y <= newCpuY + PADDLE_HEIGHT
        ) {
          newBall.dx = -Math.abs(newBall.dx) - 0.5; // Bounce left & speed up slightly
        }

        // Scoring
        if (newBall.x < 0) {
          newScore.cpu += 1;
          newBall = { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2, dx: 4, dy: 4 }; // Reset ball
          isPlayingNow = false; // Pause game
        } else if (newBall.x > BOARD_WIDTH) {
          newScore.player += 1;
          newBall = { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2, dx: -4, dy: 4 }; // Reset ball
          isPlayingNow = false; // Pause game
        }

        return {
          ...prev,
          ball: newBall,
          cpuY: newCpuY,
          score: newScore,
          isPlaying: isPlayingNow,
        };
      });
    }, 1000 / 60); // Run at 60 Frames Per Second

    // Cleanup the interval when the component unmounts or game pauses
    return () => clearInterval(gameLoop);
  }, [gameState.isPlaying]);

  // 2. Player Controls (Mouse Movement)
  const handleMouseMove = (e) => {
    // We only want to track the mouse relative to the game board
    const rect = e.currentTarget.getBoundingClientRect();
    let y = e.clientY - rect.top - PADDLE_HEIGHT / 2;

    // Clamp the paddle so it doesn't leave the board
    y = Math.max(0, Math.min(BOARD_HEIGHT - PADDLE_HEIGHT, y));

    setGameState((prev) => ({ ...prev, playerY: y }));
  };

  const startGame = () =>
    setGameState((prev) => ({ ...prev, isPlaying: true }));
  const resetGame = () =>
    setGameState({
      ball: { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2, dx: 4, dy: 4 },
      playerY: BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      cpuY: BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      score: { player: 0, cpu: 0 },
      isPlaying: false,
    });

  return (
    <GameWrapper title="Pong">
      <div className="pong-container">
        {/* Score Board */}
        <div className="pong-score-board">
          <span className="pong-player-score">{gameState.score.player}</span>
          <span className="pong-cpu-score">{gameState.score.cpu}</span>
        </div>

        {/* The Game Board */}
        <div className="pong-board" onMouseMove={handleMouseMove}>
          {/* Player Paddle */}
          <div
            className="pong-paddle player"
            style={{ top: gameState.playerY }}
          />

          {/* CPU Paddle */}
          <div className="pong-paddle cpu" style={{ top: gameState.cpuY }} />

          {/* The Ball */}
          <div
            className="pong-ball"
            style={{
              top: gameState.ball.y,
              left: gameState.ball.x,
            }}
          />
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          {!gameState.isPlaying ? (
            <Button onClick={startGame} variant="primary">
              {gameState.score.player > 0 || gameState.score.cpu > 0
                ? "Next Round"
                : "Start Game"}
            </Button>
          ) : (
            <Button
              onClick={() =>
                setGameState((prev) => ({ ...prev, isPlaying: false }))
              }
              variant="secondary"
            >
              Pause
            </Button>
          )}
          <Button onClick={resetGame} variant="secondary">
            Reset Score
          </Button>
        </div>
      </div>
    </GameWrapper>
  );
}
