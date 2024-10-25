import { placeShip }
from './placeShip.js';
import { render }
from './render.js';
import { Player } from './player.js';
import { manageTurn } from './manageTurn.js';

import { GameBoard } from './GameBoard.js';
import { GameBoard2 } from './GameBoard2.js';
import { Player2 } from './Player2.js';

function newGame(player1, player2, count) {
    player1 = new Player('Real', new GameBoard());
    player2 = new Player2('Computer', new GameBoard2());
    const mainCont = document.querySelector('#mainContainer');
    mainCont.innerHTML = "";
    console.log("newgame");
    render(player1, 'player1', count);
    render(player2, 'player2', count);

    const player1Board = document.querySelector('#player1');
    const player2Board = document.querySelector('#player2');
    for (let i = 0; i < 10; i++) {
        const id = 'row' + i;
        const ele1 = player1Board.querySelector('#row' + i);
        const ele2 = player2Board.querySelector('#row' + i);
        const pieces1 = ele1.querySelectorAll('.player1');
        const pieces2 = ele2.querySelectorAll('.player2');

        pieces1.forEach((piece) => {
            piece.addEventListener('click', function() { placeShip(piece, player1, player2, count) });
        });
        count = 0;

        pieces2.forEach((piece) => {


            piece.addEventListener('click', function() {
                manageTurn(piece, player1, player2, count)
            });

        });
    }
    if (player1Board) {
        player1Board.classList.add('active');
    }


}







export { newGame };