const gameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => gameBoard;

    const renderBoard = () => {
        const board = document.querySelector(".board");
        let currentPlayer = gamePlay.getPlayer();
        let player = gamePlay.player;
        let boardHTML = '';
        
        gameBoard.forEach((square, index) => {
            boardHTML += `<button class="square" id="square-${index}">${square}</button>`;
        })
        board.innerHTML = boardHTML;
        const square = document.querySelectorAll(".square");
 
        square.forEach((cell, index) => cell.addEventListener("click", () => {
            if (cell.textContent) return;
            gameBoard[index] = currentPlayer.playerToken;
            cell.textContent = gameBoard[index];

            if (currentPlayer === player[0]) {
                currentPlayer = player[1]
            } else {
                currentPlayer = player[0]
            }

            gamePlay.winCondition();

            if (gamePlay.getGameOver()) {
                square.forEach((square) => square.setAttribute("disabled", ""));
                gameBoard = ["", "", "", "", "", "", "", "", ""];
            }
        }))
    }
    
    return {
        renderBoard, getBoard
    }
})();

const addPlayer = (name, token) => {
    const playerName = name;
    const playerToken = token;
    return {
        playerName, playerToken
    }
};

const gamePlay = (() => {
    const playerOne = document.querySelector("#playerOne").value;
    const playerTwo = document.querySelector("#playerTwo").value;
    let currentPlayer;
    let gameOver;

    const getPlayer = () => currentPlayer;
    const getGameOver = () => gameOver;

    let player = [
        addPlayer(playerOne, "X"),
        addPlayer(playerTwo, "O")
    ]

    const winCondition = () => {
        let board = gameBoard.getBoard();
        
        if ((board[0] === board[1] && board[0] === board[2] && (board[0] === "X" || board[0] === "O")) ||
            (board[3] === board[4] && board[3] === board[5] && (board[3] === "X" || board[3] === "O")) ||
            (board[6] === board[7] && board[6] === board[8] && (board[6] === "X" || board[6] === "O")) ||
            (board[0] === board[4] && board[0] === board[8] && (board[0] === "X" || board[0] === "O")) ||
            (board[2] === board[4] && board[2] === board[6] && (board[2] === "X" || board[2] === "O")) ||
            (board[0] === board[3] && board[0] === board[6] && (board[0] === "X" || board[0] === "O")) ||
            (board[1] === board[4] && board[1] === board[7] && (board[1] === "X" || board[1] === "O")) ||
            (board[2] === board[5] && board[2] === board[8] && (board[2] === "X" || board[2] === "O"))) {
                alert("Game Over!");
                gameOver = true;
                board = board;
            } else return;
    }

    const start = () => {
        currentPlayer = player[0];
        gameOver = false;
        gameBoard.renderBoard();
    }

    return {
        start, reset, player, getPlayer,getGameOver, winCondition,
    }
})();

const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gamePlay.start();
});

resetBtn.addEventListener("click", (e) => {
    gamePlay.start();
});
