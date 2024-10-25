import { Ship } from './Ship.js';
import { manageTurn } from './manageTurn.js';
import { placeShip } from './placeShip.js';
import { player1, player2 } from './app.js';


function render(player, id, count) {
    console.log(player, id, count)
    const ele = document.createElement('div');
    const mainCont = document.querySelector('#mainContainer');

    const outerDiv = document.createElement('div');
    const score = document.createElement('div');
    if (player._board.allSunk() && id === 'player1') {
        score.textContent = "player2 wins!";



    } else if (player._board.allSunk() && id === 'player2') {

        score.textContent = "player1 wins!";


    }

    score.id = 'score';
    mainCont.appendChild(score);
    outerDiv.id = id;
    outerDiv.textContent = id;

    player.board.board.forEach((row, rowIndex) => {
        const rowEle = document.createElement('div');
        rowEle.id = 'row' + rowIndex;
        row.forEach((item, colIndex) => {
            const itemEle = document.createElement('div');

            if (item instanceof Ship) { // if item is ship


                if (item.isShipSunk()) { //if sunk
                    console.log("player", player, "id", "item", item, "itemEle", itemEle)
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
                    itemEle.addEventListener('click', function() { placeShip(itemEle, player1, player2, count) });
                }

            } else {
                if (id !== 'player1') {
                    itemEle.addEventListener('click', function() { manageTurn(itemEle, player1, player2, count) });
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