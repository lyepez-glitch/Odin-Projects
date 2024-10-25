import { create_to_do_list } from "./ToDoList";
import { createToDoItem } from './ToDoItem';
import { loadPage, loadListsFromStorage } from './dom-loader';
import { format } from "date-fns";
import getDate from './date';

function addToDo(addBtn) {
    let listsEle = document.querySelector("#to_do_lists");
    listsEle.innerHTML = '';
    const new_to_do = createToDoItem("added todo", "description", getDate(), "Low", "Write some notes");

    try {
        let toDoLists = localStorage.getItem("toDoLists");
        toDoLists = JSON.parse(toDoLists);
        toDoLists.forEach((list) => {

            if (list.id.toString() === addBtn.id) {
                console.log("true")
                list.list.push(new_to_do);
            }
        })

        toDoLists = JSON.stringify(toDoLists);
        localStorage.setItem("toDoLists", toDoLists);
        loadListsFromStorage();
    } catch (error) {
        console.error("error data not found in storage: ", error.message)
    }

}



function setPriority(priorityBtn) {
    let listsEle = document.querySelector("#to_do_lists");
    listsEle.innerHTML = '';
    const todoCont = priorityBtn.closest('.todocont');

    let toDoLists = localStorage.getItem("toDoLists");
    toDoLists = JSON.parse(toDoLists);
    toDoLists.forEach((list) => {
        list.list.forEach((todo) => {
            console.log(37, todo, todoCont)
            if (todo.id.toString() === todoCont.id.toString()) {
                todo.priority = "High";

                console.log(40, todo)
            }
        })
    })
    toDoLists = JSON.stringify(toDoLists);
    localStorage.setItem("toDoLists", toDoLists);
    loadListsFromStorage();
}

function deleteToDo(button) {
    let listsEle = document.querySelector("#to_do_lists");
    listsEle.innerHTML = '';
    const todoCont = button.closest('.todocont');

    let toDoLists = localStorage.getItem("toDoLists");
    toDoLists = JSON.parse(toDoLists);
    toDoLists.forEach((tdlist, index) => {
        tdlist.list.forEach((todo) => {
            if (todo.id.toString() === todoCont.id.toString()) {
                tdlist.list.splice(index, 1);
            }
        })
    })
    toDoLists = JSON.stringify(toDoLists);
    localStorage.setItem("toDoLists", toDoLists);
    loadListsFromStorage();
}


function markComplete(button) {
    let listsEle = document.querySelector("#to_do_lists");
    listsEle.innerHTML = '';
    const todoCont = button.closest('.todocont');

    let toDoLists = localStorage.getItem("toDoLists");
    toDoLists = JSON.parse(toDoLists);
    toDoLists.forEach((tdlist) => {
        console.log(75, tdlist)
        tdlist.list.forEach((todo) => {

            if (todo.id.toString() === todoCont.id.toString()) {
                console.log(true)
                todo.completed = true;
            }
        })
    })
    toDoLists = JSON.stringify(toDoLists);
    localStorage.setItem("toDoLists", toDoLists);
    loadListsFromStorage();
}

function addList() {
    let listsEle = document.querySelector("#to_do_lists");
    listsEle.innerHTML = '';
    let toDoLists = localStorage.getItem("toDoLists");
    toDoLists = JSON.parse(toDoLists);
    const to_do_list = create_to_do_list();
    const newToDo = createToDoItem("do laundry", "laundry", getDate(), "Low", "Write some notes");
    to_do_list.addItem(newToDo);
    console.log("to_do_list", to_do_list)
    toDoLists.push(to_do_list);
    toDoLists = JSON.stringify(toDoLists);
    localStorage.setItem("toDoLists", toDoLists);
    loadListsFromStorage();
}


export { addToDo, setPriority, deleteToDo, markComplete, addList }