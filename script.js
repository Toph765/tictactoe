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

            gamePlay.winCondition();

            if (gamePlay.getGameOver()) {
                if (!gamePlay.getDraw()) {
                    alert(`Game over! ${currentPlayer.playerName} won!`);
                } else {
                    alert(`Game over! It's a draw!`)};
                square.forEach((square) => square.setAttribute("disabled", ""));
                gameBoard = ["", "", "", "", "", "", "", "", ""];
            }


            if (currentPlayer === player[0]) {
                currentPlayer = player[1]
            } else {
                currentPlayer = player[0]
            }
        }))
    }

    const boardReset = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
    }
    
    return {
        renderBoard, getBoard, boardReset
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
    let playerOne = '';
    let playerTwo = '';
    let currentPlayer;
    let gameOver;
    let isDraw;

    let input = document.querySelectorAll("input");

    input.forEach((input) => input.addEventListener("change", () => {
        if (input.getAttribute("id") === "playerOne") {playerOne = input.value};
        if (input.getAttribute("id") === "playerTwo") {playerTwo = input.value};
    }))

    const getPlayer = () => currentPlayer;
    const getGameOver = () => gameOver;
    const getDraw = () => isDraw;

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
                gameOver = true;
                isDraw = false;
                board = board;
            } else if (board.every((cell) => cell !== "")) {
                isDraw = true;
                gameOver = true;
                board = board;
            } else return;
    }

    const start = () => {
        if (playerOne && playerTwo) {
            player[0].playerName = playerOne;
            player[1].playerName = playerTwo;
            currentPlayer = player[0];
            gameOver = false;
            gameBoard.renderBoard();
            document.querySelector("#playerOne").setAttribute("disabled", "");
            document.querySelector("#playerTwo").setAttribute("disabled", "");
        }
    }

    return {
        start, reset, player, getPlayer,getGameOver, winCondition, getDraw
    }
})();

const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gamePlay.start();
});

resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gameBoard.boardReset();
    gamePlay.start();
});
