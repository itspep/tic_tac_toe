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