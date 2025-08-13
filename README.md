# Tic-Tac-Toe Game

## Project Overview
This is a simple **Tic-Tac-Toe** game built using **HTML, CSS, and JavaScript**. Players can enter their names, choose X or O, play the game turn by turn, and see the results on the scoreboard. The game also supports **restart** functionality and keeps track of rounds and player scores.

---
# Check it LIVE 
- url(https://zahraai3.github.io/tictactoe/).


## Features
- Enter player names and select X or O.
- Click on the board to make moves.
- Switch turns automatically between Player 1 and Player 2.
- Detect winning combinations and declare a winner.
- Detect a tie when all cells are filled.
- Keep track of rounds and scores for both players.
- Restart the game while keeping the round count.

---

## Technologies Used
- **HTML**: Structure of the game page and form.
- **CSS**: Basic styling for the game board, buttons, and layout.
- **JavaScript**: Game logic and DOM manipulation.
  - **Module Pattern** used for Gameboard and Gamecontroller.
  - Event listeners for player interactions.
  - Scoreboard and round tracking.

---

## How to Play
1. Open `index.html` in a web browser.
2. Enter Player 1 name and select X or O.
3. Click **START GAME** to begin.
4. Players take turns clicking on empty cells to place their mark.
5. The game will automatically:
   - Detect if a player wins.
   - Detect a tie if the board is full.
   - Update the scoreboard and round counter.
6. Press **Restart** to reset the board and start a new round.

---

## File Structure
/tic-tac-toe
│
├─ index.html # Main HTML page
├─ style.css # CSS styling
├─ script.js # JavaScript game logic
└─ README.md # Project documentation
---

## Notes
- The game uses JavaScript **modules** to keep logic organized.
- All interactions are handled dynamically using the DOM.
- Restarting the game will reset the board but increment the round counter.
- Player scores are automatically updated when a player wins.

---

## Author
**Zahraa**
