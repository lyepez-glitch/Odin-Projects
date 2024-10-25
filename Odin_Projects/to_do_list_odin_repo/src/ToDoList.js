import { createToDoItem } from './ToDoItem';

class ToDoList {

    constructor() {
        this.list = [];
        this.id = Math.floor(Math.random() * 1000000);
    }
    addItem(item) {

        this.list.push(item);
    }
    get items() {
        return this.list;
    }

}


const create_to_do_list = () => {
    const to_do_list = new ToDoList();
    return to_do_list;
}

export { create_to_do_list };