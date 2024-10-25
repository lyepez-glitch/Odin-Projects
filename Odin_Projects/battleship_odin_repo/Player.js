import { GameBoard } from './GameBoard.js';

class Player {
    constructor(playerType, gameBoard) {
        this._type = playerType;
        this._board = gameBoard
        this.player2Count = 0;

    }
    get type() {
        return this._type;
    }
    get board() {
        return this._board;
    }

}
export { Player };