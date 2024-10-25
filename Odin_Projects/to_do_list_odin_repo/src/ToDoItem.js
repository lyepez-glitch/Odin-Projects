class ToDoItem {

    constructor(title, description, dueDate, priority, notes, completed) {
        this.id = Math.floor(Math.random() * 1000000);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
    }
    set setPriority(priority) {
        this.priority = priority;
    }
    set setCompleted(isCompleted) {
        this.completed = isCompleted;
    }
}

const createToDoItem = (title, description, dueDate, priority, notes) => {
    const item = new ToDoItem(title, description, dueDate, priority, notes);
    return item;
}

export { createToDoItem };