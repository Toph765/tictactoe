const gameBoard = (() => {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];

    const renderBoard = () => {
        const board = document.querySelector(".board");

        gameBoard.forEach(() => {
            const cell = document.createElement("div");
            cell.classList.add("square");
            board.appendChild(cell);
        })
    }

    return {
        renderBoard
    }
})();

gameBoard.renderBoard();

const startBtn = document.querySelector("#start");

startBtn.addEventListener("click", () => {
    // gamePlay.start();
})