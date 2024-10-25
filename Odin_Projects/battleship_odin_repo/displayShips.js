// import { player1, player2, carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2 } from './app.js'


const displayShips = (carrier1, battleship1, destroyer1, submarine1, patrol1, carrier2, battleship2, destroyer2, submarine2, patrol2) => {


    const chart1 = document.querySelector('#chart1');
    const chart2 = document.querySelector('#chart2');


    let ships1 = [carrier1, battleship1, destroyer1, submarine1, patrol1]
    let ships2 = [carrier2, battleship2, destroyer2, submarine2, patrol2]
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

    // parentDiv1.style.backgroundColor = 'red';
    // parentDiv1.style.height = '100px';
    // parentDiv1.style.width = '100px';

    ships1.forEach((ship) => {




        let parentDiv1 = document.createElement('div');


        if (ship.isSunk) {

        } else {
            //parentDiv1.style.backgroundColor = 'blue';
            parentDiv1.style.height = '100px';
            parentDiv1.style.width = '100px';
        }
        ship.children.forEach((child) => {
            let childDiv = document.createElement('div');
            if (child.isSunk) {
                childDiv.style.backgroundColor = 'red';
                childDiv.style.height = '100px';
                childDiv.style.width = '100px';
            } else {
                childDiv.style.backgroundColor = 'blue';
                childDiv.style.height = '100px';
                childDiv.style.width = '100px';
            }
            parentDiv1.appendChild(childDiv);
        })
        const id = ship.getId();

        parentDiv1.id = 'parent' + id;
        if (id === 'carrier') {
            carrier1Ele.appendChild(parentDiv1)
        } else if (id === 'destroyer') {
            destroyer1Ele.appendChild(parentDiv1)
        } else if (id === 'battleship') {
            battleship1Ele.appendChild(parentDiv1)
        } else if (id === 'patrol') {
            patrol1Ele.appendChild(parentDiv1)
        } else if (id === 'submarine') {
            sub1Ele.appendChild(parentDiv1)
        }



        // chart1.appendChild(parentDiv1);

    })
    ships2.forEach((ship) => {


            let parentDiv2 = document.createElement('div');
            if (ship.isSunk) {
                //parentDiv2.style.backgroundColor = 'red';
                parentDiv2.style.height = '100px';
                parentDiv2.style.width = '100px';

            } else {
                //parentDiv2.style.backgroundColor = 'blue';
                parentDiv2.style.height = '100px';
                parentDiv2.style.width = '100px';
            }
            ship.children.forEach((child) => {
                let childDiv = document.createElement('div');
                if (child.isSunk) {
                    childDiv.style.backgroundColor = 'red';
                    childDiv.style.height = '100px';
                    childDiv.style.width = '100px';
                } else {
                    childDiv.style.height = '100px';
                    childDiv.style.width = '100px';
                    childDiv.style.backgroundColor = 'blue';
                }
                parentDiv2.appendChild(childDiv);
            })
            const id = ship.getId();
            parentDiv2.id = 'parent' + id;

            if (id === 'carrier') {
                carrier2Ele.appendChild(parentDiv2)
            } else if (id === 'destroyer') {
                destroyer2Ele.appendChild(parentDiv2)
            } else if (id === 'battleship') {
                battleship2Ele.appendChild(parentDiv2)
            } else if (id === 'patrol') {
                patrol2Ele.appendChild(parentDiv2)
            } else if (id === 'submarine') {
                sub2Ele.appendChild(parentDiv2)
            }



        })
        // chart1.appendChild(carrier1Ele)
        // chart1.appendChild(battleship1Ele)
        // chart1.appendChild(destroyer1Ele)
        // chart1.appendChild(sub1Ele)
        // chart1.appendChild(patrol1Ele)

    // chart2.appendChild(carrier2Ele)
    // chart2.appendChild(battleship2Ele)
    // chart2.appendChild(destroyer2Ele)
    // chart2.appendChild(sub2Ele)
    // chart2.appendChild(patrol2Ele)




}

export { displayShips };