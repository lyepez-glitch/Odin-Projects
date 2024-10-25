import { placeShip } from './placeShip.js';
const disallowPlacingShip = () => {
    const cont = document.querySelector('#player1');
    for (let i = 0; i <= 2; i++) {
        const row = cont.querySelector('#row' + i);
        const cols = row.querySelectorAll('.player1');

        cols.forEach((col) => {
            col.removeEventListener('click', placeShip);

        })
    }
}
export { disallowPlacingShip };