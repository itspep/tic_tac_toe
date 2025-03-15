// Gameboard Module (IIFE)
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const placeMarker = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const printBoard = () => {
        console.log(board.slice(0, 3));
        console.log(board.slice(3, 6));
        console.log(board.slice(6, 9));
    };

    return { getBoard, resetBoard, placeMarker, printBoard };
})();

// Player Factory
const Player = (name, marker) => {
    return { name, marker };
};

// Game Controller Module (IIFE)
const GameController = (() => {
    let player1;
    let player2;
    let currentPlayer;

    const startGame = (name1, name2) => {
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        currentPlayer = player1;
        Gameboard.resetBoard();
        DisplayController.updateMessage(`${currentPlayer.name}'s turn!`);
        DisplayController.renderBoard();
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        DisplayController.updateMessage(`${currentPlayer.name}'s turn!`);
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes("") ? null : "Draw";
    };

    const playRound = (index) => {
        if (Gameboard.placeMarker(index, currentPlayer.marker)) {
            DisplayController.renderBoard();
            let winner = checkWinner();
            if (winner) {
                if (winner === "Draw") {
                    DisplayController.updateMessage("It's a draw!");
                } else {
                    DisplayController.updateMessage(`${currentPlayer.name} wins!`);
                }
                return;
            }
            switchTurn();
        }
    };

    return { startGame, playRound };
})();

// Display Controller Module (IIFE)
const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const message = document.querySelector("#message");
    const restartBtn = document.querySelector("#restart");

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => GameController.playRound(index));
    });

    restartBtn.addEventListener("click", () => {
        const player1Name = prompt("Enter Player 1's name:");
        const player2Name = prompt("Enter Player 2's name:");
        GameController.startGame(player1Name || "Player 1", player2Name || "Player 2");
    });

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const updateMessage = (msg) => {
        message.textContent = msg;
    };

    return { renderBoard, updateMessage };
})();

// Start the game initially
GameController.startGame("Player 1", "Player 2");