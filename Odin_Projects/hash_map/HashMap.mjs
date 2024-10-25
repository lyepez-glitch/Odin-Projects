import { LinkedList } from './LinkedList.mjs';
class HashMap {
    constructor() {
        this.map = [];
        this.count = 0;
        this.items = {};
        this.loadFactor = 0.75;
        this.filledBuckets = 0;
        this.indexes = {};
    }
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % 16;
        }

        return hashCode;
    }
    set(key, value) {


        let hashIndex = this.hash(key);
        console.log(25, hashIndex, key)

        let foundKey = this.map[hashIndex];



        if (foundKey instanceof LinkedList) {
            const foundEntry = foundKey.find(key);
            console.log(33, foundEntry)
            if (foundEntry) {

                foundKey.update(key, value);
                this.items[key] = value;


            } else {


                this.items[key] = value;

                this.map[hashIndex].append(key, value);

            }
        } else if (foundKey) {
            const ogKey = this.indexes[hashIndex];
            console.log(48, ogKey, key)

            if (ogKey !== key) {
                const newList = new LinkedList();
                newList.append(ogKey, this.map[hashIndex])
                newList.append(key, value);
                this.map[hashIndex] = newList;

            } else {
                this.map[hashIndex] = value;
                this.items[key] = value;
            }


        } else if (!foundKey) {
            console.log(63, key)
            this.map[hashIndex] = value;
            this.items[key] = value;
            this.indexes[hashIndex] = key;
            // console.log(59, this.map[hashIndex], hashIndex)
            this.count++;
        }

        let capacity = this.length() / this.map.length;
        if (capacity >= this.loadFactor) {
            console.log(72)
            const doubleSize = 2 * this.map.length;
            const newArr = new Array(doubleSize);

            this.map.forEach((item, index) => {
                newArr[index] = item;
            })

            this.map = newArr;

        }

    }

    get(key) {
        const hashedIndex = this.hash(key);
        const found = this.map[hashedIndex];

        if (found instanceof LinkedList) {
            console.log('entire linkedlist ', found.toString());
            const foundNode = found.find(key);
            if (foundNode) {
                return foundNode.data;
            }

        } else if (found) {
            return found;
        }

        return null;
    }
    has(key) {
        const hashedIndex = this.hash(key);
        if (this.map[hashedIndex])
            return true;
        return false;

    }

    remove(key) {

        const hashedIndex = this.hash(key);
        const found = this.map[hashedIndex];
        if (found instanceof LinkedList) {
            console.log(120, found)
            found.remove(key);
            console.log(122, found)
            this.count--;
            delete this.items[key];
            return true;
        } else if (found) {
            this.count--;
            delete this.items[key];
            this.map.splice(hashedIndex, 1);
            return true;
        } else {
            return false;
        }

    }
    length() {

        return this.count;
    }
    clear() {
        this.map.splice(0, this.map.length);
        this.count = 0;
        this.items = {};

    }
    keys() {

        let keys = [];
        for (const key in this.items) {
            keys.push(key);
        }
        return keys;

    }
    values() {

        let values = [];
        for (const key in this.items) {
            values.push(this.items[key]);
        }
        return values;
    }
    entries() {

        let entries = [];
        for (let key in this.items) {
            let entry = [key, this.items[key]];
            entries.push(entry);
        }
        return entries;
    }
}


export { HashMap };