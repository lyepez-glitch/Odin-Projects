import { loadPage } from './dom-loader';
import { create_to_do_list } from "./ToDoList";
import { createToDoItem } from './ToDoItem';
import { addToDo, setPriority, deleteBtn, markComplete, addList } from './clickFunctions';
import { format } from "date-fns";
import getDate from './date';
document.addEventListener("DOMContentLoaded", (event) => {
    loadPage();
});