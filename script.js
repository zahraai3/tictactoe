const Gameboard = (() => {
    const board = Array(9).fill(null);

    function setMark(index, mark) {
        if (board[index] !== null) return false;
        if (index < 0 || index > 8) return false;
        if (mark !== "x" && mark !== "o") return false;

        board[index] = mark;
        return true;
    }

    function getBoard() {
        return board.slice();
    }

    function resetBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
    }

    return { setMark, getBoard, resetBoard };
})();



const Player = (name, mark) => ({ name, mark });



const Gamecontroller = (() => {
    let player1 = Player("Player 1", "o");
    let player2 = Player("Player 2", "x");
    let currentPlayer = player1;

    const winCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    let round = 0;
    let isGameOver = true;

    function startGame(p1, p2) {
        player1 = p1;
        player2 = p2;
        currentPlayer = player1;
        Gameboard.resetBoard();
        isGameOver = false;
    }

    function makeMove(index) {
        if (Gameboard.setMark(index, currentPlayer.mark)) {
            if (checkWin()) {
                isGameOver = true;
                return currentPlayer.name + " wins!";
            }
            if (checkTie()) {
                isGameOver = true;
                return "tie";
            }
            switchPlayer();
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function checkWin() {
        const board = Gameboard.getBoard();
        const mark = currentPlayer.mark;
        return winCombos.some(combo => combo.every(i => board[i] === mark));
    }

    function checkTie() {
        const board = Gameboard.getBoard();
        return board.every(cell => cell !== null) && !checkWin();
    }

    function incrementRound() { round++; }

    return {
        startGame,
        makeMove,
        switchPlayer,
        checkWin,
        checkTie,
        getCurrentPlayer: () => currentPlayer,
        isGameActive: () => !isGameOver,
        setCurrentPlayer: (player) => currentPlayer = player,
        setGameOver: (status) => isGameOver = status,
        getRound: () => round,
        incrementRound
    };
})();






const playerForm = document.querySelector(".login form");
const playerNameInput = document.getElementById("playername");
const playerMarkSelect = document.getElementById("playerchoice");

const boxes = document.querySelectorAll(".box");
const roundCounter = document.getElementById("roundcounter");
const player1Counter = document.getElementById("player1counter");
const player2Counter = document.getElementById("player2counter");
const restartBtn = document.getElementById("restart");
const homepageBtn = document.getElementById("homepage");









playerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = playerNameInput.value;
    const playerMark = playerMarkSelect.value === "true" ? "x" : "o";

    const player1 = Player(playerName, playerMark);
    const player2 = Player("Player 2", playerMark === "x" ? "o" : "x");

    Gamecontroller.startGame(player1, player2);

    document.querySelector(".login").style.display = "none";
    document.querySelector(".gamecontainer").style.display = "block";

    updateBoardUI();
});






function updateBoardUI() {
    const currentBoard = Gameboard.getBoard();
    boxes.forEach((box, i) => {
        box.textContent = currentBoard[i] ? currentBoard[i].toUpperCase() : "";
    });
}






boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!Gamecontroller.isGameActive()) return;

        const result = Gamecontroller.makeMove(index);
        updateBoardUI();

        if (result === "tie") {
            alert("It's a tie!");
        } else if (result) {
            alert(result);
            // تحديث العدادات بعد الفوز
            if (Gamecontroller.getCurrentPlayer() === Player) {
                player1Counter.textContent = parseInt(player1Counter.textContent) + 1;
            } else {
                player2Counter.textContent = parseInt(player2Counter.textContent) + 1;
            }
        }

        roundCounter.textContent = Gamecontroller.getRound();
    });
});







restartBtn.addEventListener("click", () => {
    Gameboard.resetBoard();
    updateBoardUI();
    Gamecontroller.setCurrentPlayer(Player);
    Gamecontroller.setGameOver(false);
    Gamecontroller.incrementRound();
    roundCounter.textContent = Gamecontroller.getRound();


    document.querySelector(".login").style.display = "block";
   

    // إعادة تعيين قيم الحقول داخل الفورم
    playerNameInput.value = "";
    playerMarkSelect.value = "true";
});

