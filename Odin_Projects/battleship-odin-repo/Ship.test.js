const { Ship } = require('./Ship');
const { GameBoard } = require('./GameBoard');
const { Player } = require('./Player');
describe('class Ship', () => {
    beforeEach(() => {
        const ship = new Ship(2);
        let ship = jest.fn();
    })
    test.only('class should be instantiated', () => {
        expect(ship.getLength()).not.toBe(0);
        expect(ship.getHits()).toBe(0);
        expect(ship.isSunk()).toBe(false);
    })
    test('class should hit', () => {
        ship.hit = jest.fn(ship.hit);
        ship.hit();
        expect(ship.hits.toBe(1));
        expect(ship.hit.mock.calls.toHaveLength(1));
        expect(ship.hit.mock.calls[0][0]).toBe(1);
    })
    test('ship should be sunk', () => {
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBeTruthy();
    })
})




describe('class GameBoard', () => {
        beforeEach(() => {
            const board = new GameBoard();
        })
        test.only('class GameBoard should place ships on board', () => {
            jest.mock('./ship.js');
            let newShip = require('./ship.js');
            newShip.mockImplementation(() => 'ship')
            board.place(ship(), 0, 0);

            expect(board.getBoard()[0][0]).toEqual('ship');


        })
        test('class GameBoard should receive attack', () => {
            board.place(ship, 0, 0);
            board.receiveAttack(0, 0);
            expect(ship.hit).toHaveBeenCalled();

            expect(ship.getHits()).toBe(1);
            board.receiveAttack(1, 1);
            expect(board.missedAttacks.length).toBe(1);
        })
        test('GameBoards should report if all ships are sunk', () => {
                let count = 0;
                expect(board.allSunk()).toBe(false);
                shit.hit = jest.fn(() => {
                    count++;
                    return count
                })
                ship.hit();
                ship.hit();
                ship.hit();
                board.place(ship, 0, 0);
                expect(ship.hit).toHaveBeenCalled();
                board.allSunk = jest.fn(() => false);
                board.allSunk.mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3)
                count = 0;
                board.forEach((row) => {
                        row.forEach((item) => {

                                if (item !== 0) {

                                    if (item.isShipSunk(() => true) {
                                            count++;
                                        }
                                    }
                                })

                        }) expect(board.allSunk.mock.results[0].value).toBe(false);



                })
        })

    describe('class Player', () => {
            beforeEach(() => {
                const ship = new Ship(2);

                const board = new GameBoard();
                const player1 = new Player('real');
                const player2 = new Player('computer');
            })
            test.only('player should have a type', () => {

                expect(player1.getType()).toBe('real');
                expect(player2.getType()).toBe('computer');
            })
            test.only('each player should have it\'s own gameboard', () => {
                    expect(player1.board).not.toEqual(player2.board);
                    expect(player1.board).toBeTruthy();
                    expect(player1).toHaveProperty('board')
                    expect(player1.board)).toEqual(expect.any(GameBoard)) const type = jest
                    .fn()
                    .mockReturnValue('real')
                    .mockName('testType');
                let player3 = new Player(type()); expect(player1.getType()).toBe('real');





            })
    })