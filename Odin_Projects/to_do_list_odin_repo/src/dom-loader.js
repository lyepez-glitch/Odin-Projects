import { create_to_do_list } from "./ToDoList";
import { createToDoItem } from './ToDoItem';
import { addToDo, setPriority, deleteToDo, markComplete, addList } from './clickFunctions';
import { format } from "date-fns";
import getDate from './date';
import './style.css';

const editToDo = (hoveredEle) => {


    hoveredEle.innerHTML = "";
    let toDoLists = localStorage.getItem("toDoLists");
    toDoLists = JSON.parse(toDoLists);
    toDoLists.forEach((todolist) => {
        todolist.list.forEach((todo) => {
            if (hoveredEle.id.toString() === todo.id.toString()) {
                const ul = document.createElement("ul");
                for (const key in todo) {

                    if (key === "title" || key === "dueDate" || key === "completed") {
                        let input = document.createElement("input");
                        input.id = key;
                        input.value = todo[key];
                        let label = document.createElement("label");
                        label.for = key;
                        hoveredEle.style.width = "50%";
                        input.addEventListener("change", (event) => {
                            const id = hoveredEle.id;
                            let toDoLists = localStorage.getItem("toDoLists");
                            toDoLists = JSON.parse(toDoLists);
                            toDoLists.forEach((list) => {
                                    list.list.forEach((todo) => {

                                        if (todo.id.toString() === hoveredEle.id.toString()) {
                                            console.log(true)
                                            todo[input.id] = input.value;
                                        }
                                    })
                                })
                                // iterate through all lists in local storage
                                //iterate through all todos in lists
                                // if todo id matches hoveredele id
                                //find the key that is input.id
                                //set that key value to input.value
                            console.log("val", input.value)
                            toDoLists = JSON.stringify(toDoLists);
                            localStorage.setItem("toDoLists", toDoLists);
                            let listsEle = document.querySelector("#to_do_lists");
                            listsEle.innerHTML = '';
                            loadListsFromStorage();

                        })


                        let li = document.createElement("li");
                        li.appendChild(label)
                        li.appendChild(input);
                        ul.appendChild(li);

                    }

                }
                hoveredEle.appendChild(ul);
            }
        })
    })







}

const loadListsFromStorage = () => {


    const to_do_lists = document.querySelector("#to_do_lists");

    try {
        let toDoLists = localStorage.getItem("toDoLists");
        toDoLists = JSON.parse(toDoLists);

        toDoLists.forEach((todolist) => {
            console.log("todolist", todolist)
            const todolistsCont = document.querySelector("#to_do_lists");
            const ul = document.createElement("ul");
            const listCont = document.createElement("div");
            listCont.id = "to_do_list";
            const addBtn = document.createElement("button");
            addBtn.textContent = "Add to do";
            addBtn.id = todolist.id;
            addBtn.classList.add("addBtn");
            addBtn.addEventListener("click", function() { addToDo(addBtn) })
            todolist.list.forEach((todo) => {
                const toDoCont = document.createElement("div");
                toDoCont.classList.add("todocont")
                const ul = document.createElement("ul");
                ul.classList.add("todo");

                for (const key in todo) {

                    if (key === "title" || key === "dueDate" || key === "completed") {
                        let li = document.createElement("li");
                        li.textContent = `${key}: ${todo[key]}`;

                        ul.appendChild(li);
                    }

                }
                toDoCont.appendChild(ul)
                toDoCont.id = todo.id;
                toDoCont.contentEditable = "false";
                toDoCont.classList.add(todo.priority)


                const priorityBtn = document.createElement("button")
                priorityBtn.textContent = "Set Priority";

                priorityBtn.addEventListener("click", function() { setPriority(priorityBtn) })

                const completedBtn = document.createElement("button");

                completedBtn.textContent = "Mark completed";
                completedBtn.addEventListener("click", function() { markComplete(completedBtn) })
                toDoCont.appendChild(priorityBtn);
                toDoCont.appendChild(completedBtn);
                const deleteBtn = document.createElement("button");
                deleteBtn.addEventListener("click", function() { deleteToDo(deleteBtn) })
                deleteBtn.textContent = "Delete To Do"
                toDoCont.appendChild(deleteBtn)
                toDoCont.addEventListener("dblclick", (event) => {
                    console.log("mouseover event");
                    let hoveredEle = event.target;
                    if (hoveredEle.contentEditable == "false") {
                        editToDo(hoveredEle);
                        hoveredEle.contentEditable = "true";
                    } else {
                        hoveredEle.contentEditable = "false";


                        let listsEle = document.querySelector("#to_do_lists");
                        listsEle.innerHTML = '';

                        //this is where grab the values of the todocont ele and update them in local storage
                        loadListsFromStorage();
                    }



                });






                listCont.appendChild(toDoCont)


            })
            listCont.classList.add("to-do-list");
            listCont.appendChild(addBtn);

            todolistsCont.appendChild(listCont);
        })
    } catch (error) {
        console.error("error data not found in storage: ", error.message)
    }


}

const loadPage = () => {
    localStorage.clear();
    let toDoLists = [];
    const to_do_list = create_to_do_list();
    const todo1 = createToDoItem("todo1", "description1", getDate(), "Low", "Write some notes");
    const todo2 = createToDoItem("todo2", "description2", getDate(), "Low", "Write some notes");
    const todo3 = createToDoItem("todo3", "description3", getDate(), "Low", "Write some notes");
    to_do_list.addItem(todo1);
    to_do_list.addItem(todo2);
    to_do_list.addItem(todo3);


    toDoLists.push(to_do_list);
    toDoLists = JSON.stringify(toDoLists);
    localStorage.setItem("toDoLists", toDoLists);
    const add_to_do_list_Btn = document.querySelector("#add_to_do_list");





    add_to_do_list_Btn.addEventListener("click", addList);
    loadListsFromStorage();

}

export { loadPage, loadListsFromStorage };