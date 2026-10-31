
// src/components/Service.js

// Generate a 5x5 board containing unique numbers from 1 to 25.
export function getMat() {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);

  // Fisher-Yates shuffle
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return Array.from({ length: 5 }, (_, row) =>
    numbers.slice(row * 5, row * 5 + 5)
  );
}

// Create visited array.
export const getVal = () => new Array(26).fill("");

// Get all rows, columns and diagonals.
function getLines(board) {
  const lines = [];

  for (let i = 0; i < 5; i++) {
    lines.push(board[i]);
    lines.push(board.map(row => row[i]));
  }

  lines.push(board.map((row, i) => row[i]));

  lines.push(board.map((row, i) => row[4 - i]));

  return lines;
}

// Count completed Bingo lines.
export function isBingo(board, visited) {
  if (!board || board.length !== 5) return 0;

  return getLines(board).filter(line =>
    line.every(number => Boolean(visited[number]))
  ).length;
}

// Get the cells belonging to completed lines.
export function getCompletedCells(board, visited) {
  const completed = new Set();

  if (!board || board.length !== 5) return completed;

  getLines(board).forEach(line => {
    if (line.every(number => Boolean(visited[number]))) {
      line.forEach(number => completed.add(number));
    }
  });

  return completed;
}

// Mark a number as visited.
export function setBlock(value, visited) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1 || number > 25) {
    return { error: "Invalid number" };
  }

  if (visited[number]) {
    return { error: "Already selected!" };
  }

  const updated = [...visited];
  updated[number] = "v";

  return { visited: updated, error: null };
}

// Convert computer move history for display.
export function getChange(computer, visited) {
  return computer.map(row =>
    row.map(number => visited[number] ? "v" : "")
  );
}

// Calculate AI move score.
function evaluateBoard(board, visited) {
  const lines = getLines(board);

  let completed = 0;
  let progress = 0;
  let threats = 0;

  lines.forEach(line => {
    const remaining = line.filter(
      number => !visited[number]
    ).length;

    if (remaining === 0) completed++;

    if (remaining === 1) threats++;

    progress += (5 - remaining) ** 2;
  });

  return { completed, progress, threats };
}

// Advanced AI: choose a move that improves its own board
// while also preventing the player's potential winning moves.
export function predict(computer, visited, user) {
  const candidates = computer.flat().filter(
    number => !visited[number]
  );

  if (!candidates.length) return null;

  let bestMove = null;
  let bestScore = -Infinity;

  for (const number of candidates) {
    const nextVisited = [...visited];
    nextVisited[number] = "v";

    const aiResult = evaluateBoard(computer, nextVisited);

    const userResult = user
      ? evaluateBoard(user, nextVisited)
      : { completed: 0, threats: 0, progress: 0 };

    const score =
      aiResult.completed * 10000 +
      aiResult.threats * 250 +
      aiResult.progress * 10 -
      userResult.completed * 10000 -
      userResult.threats * 150 -
      userResult.progress * 3 +
      Math.random() * 0.5;

    if (score > bestScore) {
      bestScore = score;
      bestMove = number;
    }
  }

  return bestMove;
}

// Determine the winner.
export function handleMove(userCount, aiCount) {
  const userWon = userCount >= 5;
  const aiWon = aiCount >= 5;

  if (userWon && aiWon) return "DRAW";
  if (userWon) return "USER";
  if (aiWon) return "AI";

  return null;
}

// Board component.
export function Table({
  data,
  visited,
  completedCells,
  updateBlock,
  loading = false,
  player,
  hidden = false
}) {
  return (
    <div className="board-card">
      <div className="board-heading">
        <div>
          <h2>{player}</h2>
          <span className="board-subtitle">
            {hidden ? "Board hidden" : "5 × 5 Bingo Board"}
          </span>
        </div>

        <span className="board-status">
          {hidden ? "PRIVATE" : "ACTIVE"}
        </span>
      </div>

      <div className="board-wrapper">
        {loading && !hidden && (
          <div className="loading-overlay">
            <div className="loader"></div>
          </div>
        )}

        {hidden ? (
          <div className="hidden-board">
            <span className="hidden-icon">🔒</span>
            <h3>AI Board Hidden</h3>
            <p>Complete the game to reveal the opponent's board.</p>
          </div>
        ) : (
          <div className="bingo-grid">
            {data.map((row, rowIndex) =>
              row.map((cell, cellIndex) => {
                const isVisited = Boolean(visited[cell]);
                const isCompleted = completedCells?.has(cell);

                return (
                  <button
                    key={`${rowIndex}-${cellIndex}`}
                    className={`bingo-cell
                      ${isCompleted ? "completed" : ""}
                      ${isVisited && !isCompleted ? "visited" : ""}
                      ${!isVisited ? "available" : ""}
                    `}
                    disabled={isVisited || loading}
                    onClick={() => updateBlock(cell)}
                  >
                    {cell}
                    {isVisited && (
                      <span className="cell-check">
                        {isCompleted ? "✓" : "×"}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
