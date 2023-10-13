const gameBoard = (() => {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];

    const renderBoard = () => {
        const board = document.querySelector(".board");
        let boardHTML = '';
        
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        })
        board.innerHTML = boardHTML;
        const square = document.querySelectorAll(".square");

        square.forEach((square) => square.addEventListener("click", () => {
            square.textContent = gamePlay.player[0].playerToken;
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



    return {
        start, player, firstPlayer
    }
})();

const startBtn = document.querySelector("#start");

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gamePlay.start();
})
