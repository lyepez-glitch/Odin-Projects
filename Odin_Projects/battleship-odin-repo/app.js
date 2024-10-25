import { Player } from './Player.js';
import { render } from './render.js';
import { newGame } from './newGame.js';
import { GameBoard } from './GameBoard.js';
import { GameBoard2 } from './GameBoard2.js';
import { Player2 } from './Player2.js';

let player1 = new Player('Real', new GameBoard());
let player2 = new Player2('Computer', new GameBoard2());
let count = 0;
console.log(11)
document.addEventListener("DOMContentLoaded", (event) => {
    console.log('DOMContentLoaded');
    const newGameBtn = document.querySelector('#newGame');
    newGameBtn.addEventListener('click', function() { newGame(player1, player2, count) });

});

export { player1, player2 }