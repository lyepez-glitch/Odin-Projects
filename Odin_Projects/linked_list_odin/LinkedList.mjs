import { Node } from './Node.mjs';

class LinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
    }
    test() {
        console.log('test')
    }
    append(value) {
        if (this.head === null) {
            let newNode = new Node(value);
            this.head = newNode;
            this.tail = newNode;
        } else {
            let curr = this.head;
            while (curr !== null) {
                if (curr.next === null) {
                    curr.next = new Node(value);
                    curr.next.next = null;
                    this.tail = curr.next;
                    return;
                }
                curr = curr.next;
            }
        }
    }
    prepend(value) {
        if (!this.head) {
            this.head = value;
        } else {
            let newNode = new Node(value);
            newNode.next = this.head;
            this.head = newNode;
        }
    }
    size() {
        let count = 0;
        let curr = this.head;
        while (curr !== null) {
            count++;
            curr = curr.next;
        }
        return count;
    }
    getHead() {
        return this.head.data;
    }
    getTail() {
        return this.tail.data;
    }
    at(index) {
        let count = 0;
        let curr = this.head;
        while (curr !== null) {
            if (count === index) {
                return curr.data;
            }
            count++;

        }
    }
    pop() {
        let popped;
        let curr = this.head;
        while (curr !== null) {
            if (curr.next === this.tail) {
                popped = this.tail.data;
                curr.next = null;
                this.tail = curr;
                return popped;
            } else {
                curr = curr.next;
            }
        }
    }
    contains(value) {
        let curr = this.head;
        while (curr !== null) {
            if (curr.data === value) {
                return true;
            } else {
                curr = curr.next;
            }
        }
        return false;
    }
    find(value) {
        let curr = this.head,
            count = 0;

        while (curr !== null) {
            if (curr.data === value) {
                return count;
            }
            curr = curr.next;
            count++;
        }
        return null;
    }

    toString() {
        let curr = this.head;
        let str = "";

        while (curr !== null) {
            console.log('curr', curr.data, curr.next);
            str += '(' + curr.data + ')';
            if (curr.next !== null) {
                str += '->';
            }
            curr = curr.next;


        }
        return str;
    }


}


export { LinkedList };