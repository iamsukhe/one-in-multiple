import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/pages/MainMenu";
import About from "./components/pages/About";

// Lazy load the games
const TicTacToe = lazy(() => import("./components/games/TicTacToe"));
const Pong = lazy(() => import("./components/games/Pong"));
// You can create empty files for MemoryMatch and WhackAMole later!

export default function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "50px" }}>
            Loading Cartridge... 👾
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/about" element={<About />} />
          <Route path="/game/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/game/pong" element={<Pong />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
