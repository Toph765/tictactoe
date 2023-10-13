const gameBoard = (() => {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];

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
 
        square.forEach((square) => square.addEventListener("click", () => {
            if (square.textContent) return;
            square.textContent = currentPlayer.playerToken;

            if (currentPlayer === player[0]) {
                currentPlayer = player[1]
            } else {
                currentPlayer = player[0]
            }
        }))
    }

    return {
        renderBoard
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

    let player = [
        addPlayer(playerOne, "X"),
        addPlayer(playerTwo, "O")
    ]

    const start = () => {
        currentPlayer = player[0];
        gameOver = false;
        gameBoard.renderBoard();
    }

    const getPlayer = () => currentPlayer

    return {
        start, player, getPlayer
    }
})();

const startBtn = document.querySelector("#start");

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gamePlay.start();
})
