import { GameBoard2 } from './GameBoard2.js';

class Player2 {
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
export { Player2 };