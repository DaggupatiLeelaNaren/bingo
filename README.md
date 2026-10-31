# 🎮 Bingo AI – Smart Interactive Bingo Game

A modern, interactive Bingo game where players can challenge an AI opponent or play with friends. The game features a 5×5 Bingo board, intelligent AI gameplay, real-time move tracking, and a clean black-and-white interface with Electric Teal accents.

---

## 🚀 Project Overview

Bingo AI is a web-based gaming application designed to provide an engaging Bingo experience.

Players manually select numbers from their Bingo board, while the AI opponent responds with its own number selection. Both players' progress is tracked and compared to determine the winner.

The application focuses on interactive gameplay, intelligent decision-making, and a responsive user interface.

## ✨ Features

- **AI Game Mode:** Play Bingo against an AI opponent.
- **Friend Game Mode:** Play with friends.
- **5×5 Bingo Board:** Each player uses a board containing 25 numbers.
- **Manual Number Selection:** Players select their numbers during gameplay.
- **AI Number Selection:** The AI responds with its own number selection.
- **Hidden AI Board:** The AI's board remains hidden during gameplay to make the game more challenging.
- **Move History:** Track the numbers selected by both players.
- **Scoreboard:** Compare player and AI progress.
- **Winning Detection:** Automatically checks the winning conditions.
- **Responsive Design:** Supports desktop and mobile screens.
- **Modern UI:** Black background, white typography, and Electric Teal highlights.

## 🛠️ Technology Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- Socket.IO (for real-time multiplayer communication)

### Development Tools
- Visual Studio Code
- npm
- Git
- GitHub

## 📂 Project Structure

```text
bingo-game/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── Service.js
│   │
│   ├── pages/
│   │   ├── AIGame.jsx
│   │   ├── FriendGame.jsx
│   │   └── FriendGame.css
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.js
│
├── Server/
│   ├── index.js
│   └── package.json
│
├── package.json
├── .gitignore
└── README.md
```

*Note: Adjust the folder structure above if your actual project contains additional files or different names.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd bingo-game
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Start the Frontend

```bash
npm start
```

The frontend will normally run at:

```text
http://localhost:3000
```

### 5. Start the Backend

Open another terminal:

```bash
cd Server
npm install
```

Start the backend:

```bash
node index.js
```

If your backend uses Nodemon:

```bash
npm run dev
```

Make sure the frontend connects to the correct backend URL and port.

## 🎯 How to Play

1. Open the Bingo application.
2. Select your preferred game mode.
3. Start a new game.
4. View your 5×5 Bingo board.
5. Manually select an available number.
6. The AI opponent selects its number.
7. Track both players' moves in the move history.
8. Continue until a winning condition is achieved.
9. Compare the results and identify the winner.

## 🎨 UI Theme

The application uses a minimal, modern dark interface.

| Element | Color |
|---|---|
| Main Background | `#080808` |
| Secondary Background | `#111111` |
| Cards | `#171717` |
| Primary Text | `#FFFFFF` |
| Secondary Text | `#999999` |
| Electric Teal | `#00D6BD` |

## 🔮 Future Enhancements

- Multiple AI difficulty levels.
- Improved AI decision-making algorithms.
- Real-time multiplayer matchmaking.
- Game rooms with unique room codes.
- Player profiles and statistics.
- Game history and leaderboard.
- Sound effects and gameplay animations.
- Improved mobile experience.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push your branch.
6. Create a Pull Request.

## 📜 License

This project is intended for educational and personal development purposes. Add an appropriate open-source license if you plan to distribute it.

---

**Developed with ❤️ using React.js and Node.js.**
