class Ship {
    constructor(length, id = "") {
        this.length = length;
        this.hits = 0;
        this.isSunk = false;
        this.children = [];
        this.id = id;
        this.shipCount = 0;
        this.message = false;
    }
    hit() {
        this.hits++;
        this.isSunk = this.isShipSunk();
    }
    getCount() {
        return this.shipCount;
    }
    addChild(children) {

        this.children = this.children.concat(children);

    }
    children() {
        return this.children;
    }

    getId() {
        return this.id;
    }

    isShipSunk() {
        let count = 0;
        this.children.forEach((ship) => {
            if (ship.isSunk) {
                count++;
            }
        })
        if (count === this.children.length) {
            this.isSunk = true;
            return true;
        } else {
            return false;
        }
    }
}
export { Ship };