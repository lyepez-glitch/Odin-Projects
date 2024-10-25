import { Player } from './Player.js';
import { render } from './render.js';
import { newGame } from './newGame.js';
import { GameBoard } from './GameBoard.js';
import { Ship } from './ship.js';

const player1Chart = document.createElement('div');
const player2Chart = document.createElement('div');

const chartCont = document.createElement('chartCont');
const chart1 = document.createElement('div')
chart1.id = 'chart1';
const chart2 = document.createElement('div');
chart2.id = 'chart2';
const playerName1 = document.createElement('div');
const playerName2 = document.createElement('div');
playerName1.textContent = 'player1';
playerName2.textContent = 'player2';
chart1.appendChild(playerName1);
chart2.appendChild(playerName2);
chartCont.appendChild(chart1);
chartCont.appendChild(chart2);
chartCont.id = 'chartCont';
document.body.appendChild(chartCont);

let player1 = new Player('Real', new GameBoard());
let player2 = new Player('Computer', new GameBoard());
let count = 0;
let carrier1 = new Ship(5, 'carrier'),
    battleship1 = new Ship(4, 'battleship'),
    destroyer1 = new Ship(3, 'destroyer'),
    submarine1 = new Ship(3, 'submarine'),
    patrol1 = new Ship(2, 'patrol')

let carrier2 = new Ship(5, 'carrier'),
    battleship2 = new Ship(4, 'battleship'),
    destroyer2 = new Ship(3, 'destroyer'),
    submarine2 = new Ship(3, 'submarine'),
    patrol2 = new Ship(2, 'patrol')

carrier1.addChild(
    [new Ship(1, 'carrier1'),
        new Ship(1, 'carrier1'),
        new Ship(1, 'carrier1'),
        new Ship(1, 'carrier1'),
        new Ship(1, 'carrier1')
    ]
);


battleship1.addChild([new Ship(1, 'battleship1'), new Ship(1, 'battleship1'), new Ship(1, 'battleship1'), new Ship(1, 'battleship1')]);

destroyer1.addChild([new Ship(1, 'destroyer1'), new Ship(1, 'destroyer1'), new Ship(1, 'destroyer1')]);

submarine1.addChild([new Ship(1, 'sub1'), new Ship(1, 'sub1'), new Ship(1, 'sub1')]);

patrol1.addChild([new Ship(1, 'patrol1'), new Ship(1, 'patrol1')]);



carrier2.addChild([new Ship(1, 'carrier2'), new Ship(1, 'carrier2'), new Ship(1, 'carrier2'), new Ship(1, 'carrier2'), new Ship(1, 'carrier2')]);


battleship2.addChild([new Ship(1, 'battleship2'), new Ship(1, 'battleship2'), new Ship(1, 'battleship2'), new Ship(1, 'battleship2')]);

destroyer2.addChild([new Ship(1, 'destroyer2'), new Ship(1, 'destroyer2'), new Ship(1, 'destroyer2')]);

submarine2.addChild([new Ship(1, 'sub2'), new Ship(1, 'sub2'), new Ship(1, 'sub2')]);

patrol2.addChild([new Ship(1, 'patrol2'), new Ship(1, 'patrol2')]);














document.addEventListener("DOMContentLoaded", (event) => {

    const newGameBtn = document.querySelector('#newGame');
    newGameBtn.addEventListener('click', function() { newGame(player1, player2, count, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2) });

    const chart1 = document.querySelector('#chart1');
    const chart2 = document.querySelector('#chart2');

    const ships1 = [carrier1, battleship1, destroyer1, submarine1, patrol1]
    const ships2 = [carrier2, battleship2, destroyer2, submarine2, patrol2]
    ships2.forEach((ship) => {
        const ele = document.createElement('div');
        ele.id = ship.getId();
        const text = document.createElement('div');
        text.textContent = ship.getId();
        ele.appendChild(text);
        chart2.appendChild(ele)

    })
    ships2.forEach((ship) => {
        const ele = document.createElement('div');
        ele.id = ship.getId();
        const text = document.createElement('div');
        text.textContent = ship.getId();
        ele.appendChild(text);
        chart1.appendChild(ele)

    })

});

// export { player1, player2, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2 }