const { Ship } = require('./Ship');
const { GameBoard } = require('./GameBoard');
const { Player } = require('./Player');
describe('class Ship', () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(2);
    })
    test('class should be instantiated', () => {
        expect(ship.length).not.toBe(0);
        expect(ship.hits).toBe(0);
        expect(ship.isSunk).toBe(false);
    })
    test('class should hit', () => {
        ship.hit();
        expect(ship.hits).toBe(1);
    })
    test('ship should be sunk', () => {
        ship.hit();
        ship.hit();
        expect(ship.isSunk).toBeTruthy();
    })
})


describe('class gameboard', () => {
    let board, ship, shipInstance;
    beforeEach(() => {
        board = new GameBoard();
        ship = new Ship(2);
        shipInstance = new Ship(1, 'carrier1');
        ship.addChild(
            [shipInstance,
                new Ship(1, 'carrier1'),
                new Ship(1, 'carrier1'),
                new Ship(1, 'carrier1'),
                new Ship(1, 'carrier1')
            ])
    })
    test('class GameBoard should place ships on board', () => {
        board.place(ship, 0, 0);
        console.log('board.getBoard()', board.getBoard())
        expect(board.getBoard()[0][0]).toEqual(shipInstance);
    })
    test('class GameBoard should receive attack', () => {
        board.place(ship, 0, 0);
        board.receiveAttack(0, 0);
        expect(shipInstance.hits).toBe(1);
        board.receiveAttack(1, 1);
        expect(board.missedAttacks.length).toBe(1);
    })

    test('GameBoards should report if all ships are sunk', () => {

        let ships;
        let carrier1 = new Ship(5, 'carrier'),
            battleship1 = new Ship(4, 'battleship'),
            destroyer1 = new Ship(3, 'destroyer'),
            submarine1 = new Ship(3, 'submarine'),
            patrol1 = new Ship(2, 'patrol')
        ships = [carrier1, battleship1, destroyer1, submarine1, patrol1];
        console.log(67, ships)
        expect(board.allSunk(ships, 'player1')).toBe(false);
        ships.forEach((ship) => {
            ship.isSunk = true;
        })

        expect(board.allSunk(ships, 'player1')).toBe(true);


    })

})







describe('class Player', () => {
    let ship, board1, player1, player2, board2;
    beforeEach(() => {
        ship = new Ship(2);
        board1 = new GameBoard();
        board2 = new GameBoard();
        player1 = new Player('real', board1);
        player2 = new Player('computer', board2);
    })
    test('player should have a type', () => {
        expect(player1.type).toBe('real');
        expect(player2.type).toBe('computer');
    })
    test('each player should have it\'s own gameboard', () => {
        expect(player1.board).not.toEqual(player2.board);
        expect(player1.board).toBeTruthy();
        expect(player1).toHaveProperty('board')
        expect(player1.board).toEqual(expect.any(GameBoard))

    })
})