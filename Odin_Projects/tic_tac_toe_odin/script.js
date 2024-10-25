let movesMade = 0;
const Gameboard = (function() {
    let board = [
        ['0', '0', '0'],
        ['0', '0', '0'],
        ['0', '0', '0']
    ];
    const displayController = function() {
        // const board = Gameboard().board;

        board.forEach((row, rowIndex) => {
            let rowEle = document.createElement('div');
            rowEle.classList.add("rowContainer");
            row.forEach((piece, pieceIndex) => {
                let pieceEle = document.createElement('div');
                pieceEle.textContent = piece;
                pieceEle.classList.add("pieceEle");
                pieceEle.addEventListener('click', function() {
                    console.log("update piece")
                    changeValue(pieceEle, currentPlayer, rowIndex, pieceIndex);
                    if (currentPlayer === players[0]) {
                        currentPlayer = players[1];

                    } else if (currentPlayer === players[1]) {
                        currentPlayer = players[0];
                    }
                });
                rowEle.appendChild(pieceEle);

            })
            gameBoardEle.appendChild(rowEle);
        })
    }

    return { board, displayController }
})();


const board = Gameboard.board;


function player(label, type) {
    let score = 0;
    let addPoint = () => score++;
    let marker = type;
    let name = label;
    return { score, addPoint, marker, name }
}
const players = [
    player("1", "X"),
    player("2", "O")
]
let currentPlayer = players[0];

// const displayController = (function() {
//     // const board = Gameboard().board;

//     board.forEach((row, rowIndex) => {
//         let rowEle = document.createElement('div');
//         rowEle.classList.add("rowContainer");
//         row.forEach((piece, pieceIndex) => {
//             let pieceEle = document.createElement('div');
//             pieceEle.textContent = piece;
//             pieceEle.classList.add("pieceEle");
//             pieceEle.addEventListener('click', function() {
//                 console.log("update piece")
//                 changeValue(pieceEle, currentPlayer, rowIndex, pieceIndex);
//                 if (currentPlayer === players[0]) {
//                     currentPlayer = players[1];

//                 } else if (currentPlayer === players[1]) {
//                     currentPlayer = players[0];
//                 }
//             });
//             rowEle.appendChild(pieceEle);

//         })
//         gameBoardEle.appendChild(rowEle);
//     })
// })();




let start = () => {
    let rows = gameBoardEle.querySelectorAll(".rowContainer");
    let displayWinner = document.querySelector('#displayWinner');
    displayWinner.textContent = "";
    movesMade = 0;
    rows.forEach((row => {
        let pieces = row.querySelectorAll("div");
        pieces.forEach((piece) => {
            piece.textContent = '0';
            gameBoardEle.style.display = "block";
        })
    }))

    for (let i = 0; i < 3; i++) {
        let row = board[i];
        for (let j = 0; j < 3; j++) {
            let piece = row[j];
            row[j] = '0';
        }
    }

};
let startBtn = document.createElement('button');
let restartBtn = document.createElement('button');
startBtn.addEventListener("click", start);
restartBtn.addEventListener("click", start);

startBtn.textContent = "Start";
restartBtn.textContent = "Start Over";
let gameBoardEle = document.querySelector('#gameBoard');
document.body.appendChild(startBtn);
document.body.appendChild(restartBtn);
gameBoardEle.style.display = "none";

function changeValue(pieceEle, currentPlayer, rowIndex, pieceIndex) {
    movesMade++;
    currentPlayer.addPoint();
    let player1 = players[0];
    let player2 = players[1];
    if (pieceEle.textContent === '0') {
        pieceEle.textContent = currentPlayer.marker;
        board[rowIndex][pieceIndex] = currentPlayer.marker;
    }

    console.log("board ", board);
    if (movesMade > 2) {
        if (checkForTie()) {
            console.log("It's a tie!")

        } else if (threeInRow(currentPlayer, board)) {
            console.log("Player " + currentPlayer.name + " wins!")
            let displayWinner = document.querySelector('#displayWinner');
            let winId = '#player' + currentPlayer.name;
            let winner = document.querySelector(winId).value;
            displayWinner.textContent = "Player " + winner + " wins!"

        }
    }


}

function threeInRow(player, board) {
    const marker = player.marker;


    for (let i = 0; i < 3; i++) {
        let row = board[i];
        if (row.every(piece => piece === marker)) {
            return true;
        }


    }

    return false;
}



function checkForTie() {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        let row = board[i];
        for (let j = 0; j < 3; j++) {
            let cell = row[j];
            if (cell === 'X' || cell === 'O') {
                count++;
            }
        }

    }
    if (count === 9) {
        return true;
    } else {
        return false;
    }

}



const displayController = Gameboard.displayController();