import { Ship } from './Ship.js';
import { render } from './render.js';
import { disallowPlacingShip } from './disallowPlaceShip.js';
// import { carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2 } from './app.js'
import { displayShips } from './displayShips.js';


function placeShip(piece, player1, player2, count, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2) {
    let newShip1, newShip2;

    if (count === 0) {
        newShip1 = carrier1;
    } else if (count === 1) {
        newShip1 = battleship1;
    } else if (count === 2) {
        newShip1 = destroyer1;
    } else if (count === 3) {
        newShip1 = submarine1;
    } else if (count === 4) {
        newShip1 = patrol1;
    }


    if (count === 0) {
        newShip2 = carrier2;
    } else if (count === 1) {
        newShip2 = battleship2;
    } else if (count === 2) {
        newShip2 = destroyer2;
    } else if (count === 3) {
        newShip2 = submarine2;
    } else if (count === 4) {
        newShip2 = patrol2;
    }




    const mainCont = document.querySelector('#mainContainer')
    const score = mainCont.querySelector('#score')
    let icon;
    try {
        icon = piece.querySelector('i');

        if (icon.classList.contains('fa-bomb')) {
            return;
        }

    } catch (e) {

    }
    const vals = ['X', '<i class="fa-solid fa-bomb"><i>', 'missed', 'ship'];
    if (vals.includes(piece.innerHTML || vals.includes(piece.textContent))) {
        return;
    }

    if (piece.classList.contains('player1') && count < 5) {
        const id = piece.id.split('-');

        let row = id[0],
            col = id[1];


        player1._board.place(newShip1, row, col)
            // player2._board.randomPlace(newShip2);
        count++;


        if (count === 5) {
            player2._board.randomPlace(carrier2);
            player2._board.randomPlace(battleship2);
            player2._board.randomPlace(destroyer2);
            player2._board.randomPlace(submarine2);
            player2._board.randomPlace(patrol2);
            disallowPlacingShip();
        }
    }


    const chart1 = document.querySelector('#chart1');
    const chart2 = document.querySelector('#chart2');
    const carrier1Ele = chart1.querySelector('#carrier')
    const battleship1Ele = chart1.querySelector('#battleship');
    const destroyer1Ele = chart1.querySelector('#destroyer');
    const sub1Ele = chart1.querySelector('#submarine');
    const patrol1Ele = chart1.querySelector('#patrol');

    const carrier2Ele = chart2.querySelector('#carrier')
    const battleship2Ele = chart2.querySelector('#battleship');
    const destroyer2Ele = chart2.querySelector('#destroyer');
    const sub2Ele = chart2.querySelector('#submarine');
    const patrol2Ele = chart2.querySelector('#patrol');
    mainCont.innerHTML = ""
    carrier1Ele.innerHTML = "";
    battleship1Ele.innerHTML = "";
    destroyer1Ele.innerHTML = "";
    patrol1Ele.innerHTML = "";
    sub1Ele.innerHTML = "";
    carrier2Ele.innerHTML = "";
    battleship2Ele.innerHTML = "";
    destroyer2Ele.innerHTML = "";
    patrol2Ele.innerHTML = "";
    sub2Ele.innerHTML = "";

    render(player1, 'player1', count, [carrier1, battleship1, destroyer1, submarine1, patrol1], player1, player2, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2);

    render(player2, 'player2', count, [carrier2, battleship2, destroyer2, submarine2, patrol2], player1, player2, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2);

    carrier1Ele.innerHTML = "";
    battleship1Ele.innerHTML = "";
    destroyer1Ele.innerHTML = "";
    patrol1Ele.innerHTML = "";
    sub1Ele.innerHTML = "";
    carrier2Ele.innerHTML = "";
    battleship2Ele.innerHTML = "";
    destroyer2Ele.innerHTML = "";
    patrol2Ele.innerHTML = "";
    sub2Ele.innerHTML = "";
    displayShips(carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2);
}

export { placeShip };