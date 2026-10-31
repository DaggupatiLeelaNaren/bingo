
import React, { useEffect, useRef, useState } from "react";

import "./App.css";

import {
  getMat,
  getVal,
  isBingo,
  predict,
  setBlock,
  handleMove,
  getCompletedCells,
  Table
} from "./components/Services.js";

import Values from "./components/Values.js";

function createGame(aiFirst = true) {
  const userBoard = getMat();
  const aiBoard = getMat();
  let visited = getVal();

  const userMoves = [];
  const aiMoves = [];

  if (aiFirst) {
    const firstMove = predict(aiBoard, visited, userBoard);

    if (firstMove !== null) {
      const result = setBlock(firstMove, visited);
      visited = result.visited;
      aiMoves.push(firstMove);
    }
  }

  return {
    userBoard,
    aiBoard,
    visited,
    userMoves,
    aiMoves,
    winner: null,
    loading: false
  };
}

function App() {
  const [aiFirst, setAiFirst] = useState(true);

  const [game, setGame] = useState(() => createGame(true));

  const timerRef = useRef(null);
  const gameRef = useRef(game);

  useEffect(() => {
    gameRef.current = game;
  }, [game]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const startNewGame = (first = aiFirst) => {
    clearTimeout(timerRef.current);

    const newGame = createGame(first);

    gameRef.current = newGame;
    setGame(newGame);
  };

  const updateWinner = (current, visited) => {
    const userCount = isBingo(current.userBoard, visited);
    const aiCount = isBingo(current.aiBoard, visited);

    return handleMove(userCount, aiCount);
  };

  const userMove = (number) => {
    const current = gameRef.current;

    if (
      current.winner ||
      current.loading ||
      current.visited[number]
    ) {
      return;
    }

    const result = setBlock(number, current.visited);

    if (result.error) return;

    const updated = {
      ...current,
      visited: result.visited,
      userMoves: [...current.userMoves, number]
    };

    const winner = updateWinner(updated, updated.visited);

    if (winner) {
      updated.winner = winner;
      gameRef.current = updated;
      setGame(updated);
      return;
    }

    updated.loading = true;

    gameRef.current = updated;
    setGame(updated);

    // AI thinks before making its move.
    timerRef.current = setTimeout(() => {
      const latest = gameRef.current;

      if (latest.winner) return;

      const aiNumber = predict(
        latest.aiBoard,
        latest.visited,
        latest.userBoard
      );

      if (aiNumber === null) {
        const finished = {
          ...latest,
          winner: "DRAW",
          loading: false
        };

        gameRef.current = finished;
        setGame(finished);
        return;
      }

      const aiResult = setBlock(aiNumber, latest.visited);

      const nextVisited = aiResult.visited;

      const nextGame = {
        ...latest,
        visited: nextVisited,
        aiMoves: [...latest.aiMoves, aiNumber],
        loading: false
      };

      const aiWinner = updateWinner(nextGame, nextVisited);

      nextGame.winner = aiWinner;

      gameRef.current = nextGame;
      setGame(nextGame);
    }, 700);
  };

  const toggleFirstMove = () => {
    const next = !aiFirst;

    setAiFirst(next);
    startNewGame(next);
  };

  const userCompleted = getCompletedCells(
    game.userBoard,
    game.visited
  );

  const aiCompleted = getCompletedCells(
    game.aiBoard,
    game.visited
  );

  const userScore = isBingo(game.userBoard, game.visited);
  const aiScore = isBingo(game.aiBoard, game.visited);

  const isFinished = Boolean(game.winner);

  return (
    <div className="app-container">

      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="game-container">

        {/* Header */}
        <header className="game-header">
          <div className="brand">
            <span className="brand-icon">✦</span>
            <span>BINGO<span className="brand-highlight"></span></span>
          </div>

          <span className="game-badge">
            ● LIVE GAME
          </span>
        </header>

        {/* Hero */}
        <section className="hero-section">
          <span className="eyebrow">THE ULTIMATE NUMBER CHALLENGE</span>

          <h1>
            Think Fast.
            <span> Play Smart.</span>
          </h1>

          <p>
            Challenge the Computer, complete five lines and claim your victory.
          </p>
        </section>

        {/* Scoreboard */}
        <section className="scoreboard">

          <div className="score-card user-score">
            <div className="score-avatar">👤</div>
            <div>
              <span className="score-label">YOU</span>
              <h2>{userScore} <small>/ 5</small></h2>
            </div>
          </div>

          <div className="versus">VS</div>

          <div className="score-card ai-score">
            <div className="score-avatar">🤖</div>
            <div>
              <span className="score-label">COMPUTER OPPONENT</span>
              <h2>{aiScore} <small>/ 5</small></h2>
            </div>
          </div>

        </section>

        {/* Move History */}
        <section className="history-section">
          <Values
            values={game.userMoves}
            player="Your moves"
            type="user-history"
          />

          <Values
            values={game.aiMoves}
            player="Computer moves"
            type="ai-history"
          />
        </section>

        {/* Settings */}
        <section className="settings-card">

          <div>
            <h3>Game Settings</h3>
            <p>Choose who makes the first move.</p>
          </div>

          <label className="toggle-wrapper">
            <span>AI First</span>

            <input
              type="checkbox"
              checked={aiFirst}
              onChange={toggleFirstMove}
              disabled={game.loading}
            />

            <span className="toggle-slider"></span>
          </label>

        </section>

        {/* Game Boards */}
        <section className="boards-section">

          <Table
            data={game.userBoard}
            visited={game.visited}
            completedCells={userCompleted}
            updateBlock={userMove}
            loading={false}
            player="YOUR BOARD"
          />

          {isFinished ? (
            <Table
              data={game.aiBoard}
              visited={game.visited}
              completedCells={aiCompleted}
              player="COMPUTER BOARD"
            />
          ) : (
            <Table
              data={[]}
              visited={[]}
              player="COMPUTER BOARD"
              hidden={true}
            />
          )}

        </section>

        {/* Instructions */}
        {!isFinished && (
          <div className="instruction-card">
            <span className="instruction-icon">
              {game.loading ? "🤖" : "👆"}
            </span>

            <div>
              <h3>
                {game.loading
                  ? "AI is thinking..."
                  : "Your turn!"}
              </h3>

              <p>
                {game.loading
                  ? "Calculating the best possible move."
                  : "Select any available number on your board."}
              </p>
            </div>

            {game.loading && <div className="thinking-loader"></div>}
          </div>
        )}

        {/* Game Result */}
        {isFinished && (
          <section className="result-card">

            <div className="result-icon">
              {game.winner === "USER"
                ? "🏆"
                : game.winner === "AI"
                ? "🤖"
                : "🤝"}
            </div>

            <h2>
              {game.winner === "USER"
                ? "Congratulations! You Won!"
                : game.winner === "AI"
                ? "AI Wins This Round!"
                : "It's a Draw!"}
            </h2>

            <p>
              {game.winner === "USER"
                ? "Excellent gameplay! You defeated the AI."
                : game.winner === "AI"
                ? "The AI completed five lines before you."
                : "Both players reached five Bingo lines."}
            </p>

            <button
              className="primary-button"
              onClick={() => startNewGame()}
            >
              ↻ &nbsp; PLAY AGAIN
            </button>

          </section>
        )}

        {/* Give Up */}
        {!isFinished && (
          <button
            className="give-up-button"
            onClick={() => {
              const updated = {
                ...gameRef.current,
                winner: "AI",
                loading: false
              };

              clearTimeout(timerRef.current);

              gameRef.current = updated;
              setGame(updated);
            }}
            disabled={game.loading}
          >
            GIVE UP
          </button>
        )}

        <footer className="game-footer">
          <p>© 2026 LEELANAREN · PLAY. THINK. WIN.</p>
        </footer>

      </main>
    </div>
  );
}

export default App;
