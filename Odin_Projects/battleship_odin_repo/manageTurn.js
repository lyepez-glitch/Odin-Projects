import { Ship } from './ship.js';
import { render } from './render.js';
import { displayShips } from './displayShips.js';
// import { player1, player2, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2 } from './app.js';

async function manageTurn(piece, player1, player2, count, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2) {
    function delay(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
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
    const vals = ['X', '<i class="fa-solid fa-bomb"><i>', 'missed', 'ship'];
    let icon;
    const mainCont = document.querySelector('#mainContainer')
    const score = mainCont.querySelector('#score')
    try {
        icon = piece.querySelector('i');

        if (icon.classList.contains('fa-bomb')) {

            return;
        }

    } catch (e) {

    }

    if (vals.includes(piece.innerHTML || vals.includes(piece.textContent))) {
        return;
    }



    const player1Board = document.querySelector('#player1');
    const player2Board = document.querySelector('#player2');



    const id = piece.id.split('-');
    let row = id[0],
        col = id[1];





    const player2Ship = player2.board.receiveAttack(row, col)
        // if (player2Ship.isSunk) {
        //     score.textContent = "You sunk my battleship!";
        // }

    const ships1 = [carrier1, battleship1, destroyer1, submarine1, patrol1]
    const ships2 = [carrier2, battleship2, destroyer2, submarine2, patrol2]

    mainCont.innerHTML = "";

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




    // setTimeout(function() {
    //     player1._board.randomReceiveAttack()


    //     player1Board.classList.add('active');
    //     player2Board.classList.remove('active');
    // }, 5000)



    // player1._board.board.forEach((row) => {
    //     row.forEach((col) => {
    //         const ship = player1._board.board[row][col];
    //         if (ship instanceof Ship) {
    //             if (ship.isSunk) {
    //                 const domEle = document.querySelector(`#${row}-${col}`)
    //                 domEle.innerHTML = '<i class="fa-solid fa-bomb"><i>';
    //             }
    //         }
    //     })
    // })
    // const ogRow = row;


    // player2.board.board.forEach((row, rowIndex) => {

    //     row.forEach((item, colIndex) => {
    //         const rowEle = document.querySelector('#row' + rowIndex);





    //     })
    // })

    // player1.board.board.forEach((row, rowIndex) => {

    //     row.forEach((item, colIndex) => {
    //         const rowEle = document.querySelector('#row' + rowIndex);





    //     })
    // })



    await delay(2000);
    player2Board.classList.add('active');
    player1Board.classList.remove('active');
    // const updatedVal1 = player1.board.randomReceiveAttack()


    player1Board.classList.add('active');
    player2Board.classList.remove('active');


    // setTimeout(() => {
    //     player2Board.classList.add('active');
    //     player1Board.classList.remove('active');

    const player1Ship1 = player1._board.randomReceiveAttack()
    const player1Ship2 = player1._board.randomReceiveAttack()
    const player1Ship3 = player1._board.randomReceiveAttack()
    const player1Ship4 = player1._board.randomReceiveAttack()
    const player1Ship5 = player1._board.randomReceiveAttack()

    let allShips = [carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2]

    allShips.forEach((ship) => {
        console.log('type', ship.getId(), "children", ship.children)
        let childCount = 0;
        ship.children.forEach((child) => {
            if ((child.isSunk)) {
                childCount++;
            }
        })
        if (childCount === ship.children.length) {
            ship.isSunk = true;
        }

    })

    //
    // if (player1Ship1.isSunk) {
    //     score.textContent = "You sunk my battleship!";
    // }
    // if (player1Ship2.isSunk) {
    //     score.textContent = "You sunk my battleship!";
    // }

    // if (player1Ship3.isSunk) {
    //     score.textContent = "You sunk my battleship!";
    // }
    // if (player1Ship4.isSunk) {
    //     score.textContent = "You sunk my battleship!";
    // }
    // if (player1Ship5.isSunk) {
    //     score.textContent = "You sunk my battleship!";
    // }


    // ships1.forEach((ship) => {
    //     if (ship.allSunk() && ship.message!) {
    //         score.textContent = "You sunk my battleship!";
    //         ship.message = true;

    //     }
    // })

    // ships2.forEach((ship) => {
    //         if (ship.allSunk() && !ship.message) {
    //             score.textContent = "You sunk my battleship!";
    //             ship.message = true;

    //         }
    //     })
    //     player1Board.classList.add('active');
    //     player2Board.classList.remove('active');



    // }, 3000)

    mainCont.innerHTML = "";

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
    // const coord = '#' + row + '-' + col;
    // const domeEle = document.querySelector(coord)



}

export { manageTurn };