import { Ship } from './Ship.js';

export class GameBoard2 {
    constructor() {
        this.board = []
        for (let i = 0; i < 10; i++) {
            let row = [];
            for (let j = 0; j < 10; j++) {
                row.push(0);
            }
            this.board[i] = row;
        }

        this.missedAttacks = [];
        this.placed = [];
        this.successfulHits = [];
    }
    getBoard() {
        return this.board;
    }
    place(ship, row, column) {
        this.board[row][column] = ship;
    }
    isPlaced(randomIndex, randomCol) {
        this.placed.forEach((obj) => {
            if (obj["row"] === randomIndex && obj["col"] === randomCol) {
                return true;
            }

        })
        return false;
    }
    isMissed(randomIndex, randomCol) {
        this.missedAttacks.forEach((obj) => {
            if (obj["row"] === randomIndex && obj["col"] === randomCol) {
                return true;
            }

        })
        return false;
    }



    isAttacked = (row, col) => {
        this.successfulHits.forEach((hit) => {
            if (hit.includes(row) && hit.includes(col)) {
                return true;
            }
        })
        return false;
    }
    randomReceiveAttack = () => {
        let randomIndex = Math.floor(Math.random() * 10);
        let randomCol = Math.floor(Math.random() * 10);
        while (this.isMissed(randomIndex, randomCol) || this.isAttacked(randomIndex, randomCol)) {
            randomIndex = Math.floor(Math.random() * 10);
            randomCol = Math.floor(Math.random() * 10);
        }
        const ship = this.board[randomIndex][randomCol];
        console.log("player 1 row", randomIndex, "player 1 col", randomCol)
        if (ship !== 0) {
            if (ship instanceof Ship) {
                if (!ship.isShipSunk()) {
                    ship.hit();
                    this.successfulHits.push([randomIndex, randomCol])
                }
                // //debugging
                // if (ship.isShipSunk()) {
                //     this.board[randomIndex][randomCol] = -1;
                // }
                // //


            }


        } else {
            this.board[randomIndex][randomCol] = 'missed';
            this.missedAttacks.push(randomIndex, randomCol)
        }


    }
    randomPlace = (ship) => {
        let randomIndex = Math.floor(Math.random() * 10);
        let randomCol = Math.floor(Math.random() * 10);
        while (this.isPlaced(randomIndex, randomCol)) {
            randomIndex = Math.floor(Math.random() * 10);
            randomCol = Math.floor(Math.random() * 10);
        }

        this.board.forEach((row, rowIndex) => {
            if (randomIndex === rowIndex) {
                row.forEach((col, colIndex) => {
                    if (randomCol === colIndex) {
                        this.board[rowIndex][colIndex] = ship;

                    }
                })

            }

        })
        this.placed.push({ "row": randomIndex, "col": "colIndex" })
    }
    receiveAttack(row, column) {

        const ship = this.board[row][column];
        console.log("player 2 row", row, "player2 col", column)
        if (ship !== 0) {
            if (ship instanceof Ship) {
                if (!ship.isShipSunk()) {
                    ship.hit();
                    this.successfulHits.push([row, column])
                }
                // //debugging
                // if (ship.isShipSunk()) {
                //     this.board[row][column] = -1;
                // }
                // //


            }



        } else {
            this.missedAttacks.push([row, column])
            this.board[row][column] = 'missed';
        }

    }
    allSunk() {

        let count = 0;
        this.board.forEach((row) => {
            row.forEach((item) => {

                if (item !== 0) {
                    if (item instanceof Ship) {
                        if (item.isShipSunk()) {
                            count++;
                        }
                    }

                }
                // if (item === -1) {
                //     count++;
                // }
            })

        })
        if (count < 5) {
            return false;
        } else {
            return true;
        }

    }
}