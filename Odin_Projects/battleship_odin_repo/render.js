import { Ship } from './Ship.js';
import { manageTurn } from './manageTurn.js';
import { placeShip } from './placeShip.js';
// import { player1, player2, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2 } from './app.js';

let firstTimeLoad = true;

function render(player, id, count, ships, player1, player2, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2) {



    const mainCont = document.querySelector('#mainContainer');

    const chart1 = document.querySelector('#chart1');
    const chart2 = document.querySelector('#chart2');
    // ships.forEach((ship) => {
    //     const ele = document.createElement('div');
    //     ele.id = ship.getId();
    //     const text = document.createElement('div');
    //     text.textContent = ship.getId();
    //     ele.appendChild(text);
    //     if (id === 'player1') {
    //         chart1.appendChild(ele)
    //     } else {
    //         chart2.appendChild(ele)
    //     }
    // })
    const outerDiv = document.createElement('div');
    const score = document.createElement('div');

    if (player._board.allSunk(ships, id) && id === 'player1') {

        score.textContent = "player2 wins!";



    } else if (player._board.allSunk(ships, id) && id === 'player2') {

        score.textContent = "player1 wins!";


    }

    score.id = 'score';
    mainCont.appendChild(score);
    outerDiv.id = id;
    let shipCount = 0;
    outerDiv.textContent = id;
    ships.forEach((ship) => {
        let count = 0;
        for (let i = 0; i < ship.children.length; i++) {
            const child = ship.children[i];

            if (child.isSunk) {
                count++;
            }
        }
        if (count === ship.children.length && (ship.children.length > 0)) {
            shipCount++;
            if (!ship.message) {
                score.textContent = id + ": You sunk my battleship!";
            }


            setTimeout(function() {}, 30000)
            ship.message = true;
        }
    })

    // if (shipCount >= 5) {
    //     if (id === 'player1') {
    //         score.textContent = "player2 wins!";
    //     } else {
    //         score.textContent = "player 1 wins!";
    //     }

    // }


    // })








    player.board.board.forEach((row, rowIndex) => {
        const rowEle = document.createElement('div');
        rowEle.id = 'row' + rowIndex;
        row.forEach((item, colIndex) => {
            const itemEle = document.createElement('div');


            if (item.children) { // if item is ship


                if (item.isSunk) { //if sunk

                    itemEle.innerHTML = '<i class="fa-solid fa-bomb"><i>';
                } else { //is ship and not sunk

                    if (id === 'player1') {
                        itemEle.innerHTML = 'ship';
                    } else {
                        itemEle.innerHTML = 'hide';
                    }

                }

            } else if (item === 0) { //not ship
                if (id === 'player2') {
                    itemEle.innerHTML = 'hide';
                } else {
                    itemEle.innerHTML = '0';
                }

            } else if (item === 'missed') {
                itemEle.innerHTML = 'X';
            }
            itemEle.id = rowIndex + '-' + colIndex;

            itemEle.classList.add(id);
            if (count < 5) {
                if (id !== 'player2') {
                    itemEle.addEventListener('click', function() { placeShip(itemEle, player1, player2, count, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2) });
                }

            } else {
                if (id !== 'player1') {
                    itemEle.addEventListener('click', function() { manageTurn(itemEle, player1, player2, count, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2) });
                }
            }
            rowEle.appendChild(itemEle)
            outerDiv.appendChild(rowEle);

        })
    })
    if (id === 'player1') {
        outerDiv.classList.add('active');
    }
    mainCont.appendChild(outerDiv);
}


export { render };