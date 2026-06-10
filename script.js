//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const game = document.getElementById("game");
const form = document.getElementById("player-form");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let board = Array(9).fill("");

const winPatterns = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

submitBtn.addEventListener("click", () => {
	player1 = document.getElementById("player-1").value.trim();
	player2 = document.getElementById("player-2").value.trim();

	if(!player1 || !player2) return;

	form.style.display = "none";
	game.style.display = "block";

	currentPlayer = player1;
	currentSymbol = "X";

	message.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "") return;

        board[index] = currentSymbol;
        cell.textContent = currentSymbol;

        const winner = checkWinner();

        if (winner) {
            message.textContent = `${currentPlayer} congratulations you won!`;

            winner.forEach(i => {
                cells[i].classList.add("winner");
            });

            return;
        }

        if (board.every(val => val !== "")) {
            message.textContent = "It's a draw!";
            return;
        }

        if (currentSymbol === "X") {
            currentSymbol = "O";
            currentPlayer = player2;
        } else {
            currentSymbol = "X";
            currentPlayer = player1;
        }

        message.textContent = `${currentPlayer}, you're up`;
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            return pattern;
        }
    }
    return null;
}