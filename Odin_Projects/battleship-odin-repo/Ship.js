class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.isSunk = false;
    }
    hit() {
        this.hits++;
        this.isSunk = this.isShipSunk();
    }
    isShipSunk() {
        if (this.hits >= this.length) {
            return true;
        } else {
            return false;
        }
    }
}
export { Ship };