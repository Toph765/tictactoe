const gameBoard = (() => {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => gameBoard;

    const renderBoard = () => {
        const board = document.querySelector(".board");
        let currentPlayer = gamePlay.getPlayer();
        let player = gamePlay.player;
        let boardHTML = '';
        
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        })
        board.innerHTML = boardHTML;
        const square = document.querySelectorAll(".square");
 
        square.forEach((square, index) => square.addEventListener("click", () => {
            if (square.textContent) return;
            square.textContent = currentPlayer.playerToken;
            gameBoard[index] = currentPlayer.playerToken;
            console.log(gameBoard)

            if (currentPlayer === player[0]) {
                currentPlayer = player[1]
            } else {
                currentPlayer = player[0]
            }

            gamePlay.winCondition();
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
    const board = gameBoard.getBoard();
    let currentPlayer;
    let gameOver;

    const getPlayer = () => currentPlayer;

    let player = [
        addPlayer(playerOne, "X"),
        addPlayer(playerTwo, "O")
    ]

    const start = () => {
        currentPlayer = player[0];
        gameOver = false;
        gameBoard.renderBoard();
    }

    const winCondition = () => {
        if ((board[0] === board[1] && board[1] === board[2] && board[0] === board[2] && (board[0] === "X" || board[0] === "O")) ||
            (board[3] === board[4] && board[4] === board[5] && board[3] === board[5] && (board[3] === "X" || board[3] === "O")) ||
            (board[6] === board[7] && board[7] === board[8] && board[6] === board[8] && (board[6] === "X" || board[6] === "O")) ||
            (board[0] === board[4] && board[4] === board[8] && board[0] === board[8] && (board[0] === "X" || board[0] === "O")) ||
            (board[2] === board[4] && board[4] === board[6] && board[2] === board[6] && (board[2] === "X" || board[2] === "O")) ||
            (board[0] === board[3] && board[3] === board[6] && board[0] === board[6] && (board[0] === "X" || board[0] === "O")) ||
            (board[1] === board[4] && board[4] === board[7] && board[1] === board[7] && (board[1] === "X" || board[1] === "O")) ||
            (board[2] === board[5] && board[5] === board[8] && board[2] === board[8] && (board[2] === "X" || board[2] === "O"))) {
                alert("Game Over!");
            } else return;
    }

    return {
        start, player, getPlayer, winCondition
    }
})();

const startBtn = document.querySelector("#start");

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gamePlay.start();
})
