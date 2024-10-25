/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ToDoItem.js":
/*!*************************!*\
  !*** ./src/ToDoItem.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createToDoItem: () => (/* binding */ createToDoItem)
/* harmony export */ });
class ToDoItem {

    constructor(title, description, dueDate, priority, notes, completed) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
    }
}

const createToDoItem = (title, description, dueDate, priority, notes) => {
    const item = new ToDoItem(title, description, dueDate, priority, notes);
    return item;
}



/***/ }),

/***/ "./src/ToDoList.js":
/*!*************************!*\
  !*** ./src/ToDoList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create_to_do_list: () => (/* binding */ create_to_do_list)
/* harmony export */ });
/* harmony import */ var _ToDoItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToDoItem */ "./src/ToDoItem.js");


class ToDoList {

    constructor() {
        this.list = [];
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



/***/ }),

/***/ "./src/dom-loader.js":
/*!***************************!*\
  !*** ./src/dom-loader.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadPage: () => (/* binding */ loadPage)
/* harmony export */ });
/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToDoList */ "./src/ToDoList.js");
/* harmony import */ var _ToDoItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToDoItem */ "./src/ToDoItem.js");


const loadListsFromStorage = (to_do_list) => {


    const to_do_lists = document.querySelector("#to_do_lists");


    let toDoLists = localStorage.getItem("toDoLists");
    toDoLists = JSON.parse(toDoLists);
    console.log("toDoLists", toDoLists)
    toDoLists.forEach((todolist) => {
        const ul = document.createElement("ul");
        const div = document.createElement("div");
        todolist.list.forEach((todo) => {


            for (const key in todo) {

                if (key === "title" || key === "dueDate") {
                    let li = document.createElement("li");
                    li.textContent = `${key}: ${todo[key]}`;

                    ul.appendChild(li);
                }

            }
            div.appendChild(ul)
            const todolistsCont = document.querySelector("#to_do_lists");
            todolistsCont.appendChild(div);

        })
    })

}

const loadPage = () => {
    localStorage.clear();
    let toDoLists = [];
    const to_do_list = (0,_ToDoList__WEBPACK_IMPORTED_MODULE_0__.create_to_do_list)();
    const todo1 = (0,_ToDoItem__WEBPACK_IMPORTED_MODULE_1__.createToDoItem)("todo1", "description1", Date.now(), "Low", "Write some notes");
    const todo2 = (0,_ToDoItem__WEBPACK_IMPORTED_MODULE_1__.createToDoItem)("todo2", "description2", Date.now(), "Low", "Write some notes");
    const todo3 = (0,_ToDoItem__WEBPACK_IMPORTED_MODULE_1__.createToDoItem)("todo3", "description3", Date.now(), "Low", "Write some notes");
    to_do_list.addItem(todo1);
    to_do_list.addItem(todo2);
    to_do_list.addItem(todo3);

    console.log('to_do_list', to_do_list)
    toDoLists.push(to_do_list);
    toDoLists = JSON.stringify(toDoLists);
    localStorage.setItem("toDoLists", toDoLists);
    const add_to_do_list_Btn = document.querySelector("#add_to_do_list");
    loadListsFromStorage();




    add_to_do_list_Btn.addEventListener("click", function() {


    });

}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-loader */ "./src/dom-loader.js");


document.addEventListener("DOMContentLoaded", (event) => {
    (0,_dom_loader__WEBPACK_IMPORTED_MODULE_0__.loadPage)();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2Y0Qzs7QUFFNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCK0M7QUFDSDtBQUM1Qzs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLElBQUksSUFBSSxVQUFVOztBQUUxRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVCxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw0REFBaUI7QUFDeEMsa0JBQWtCLHlEQUFjO0FBQ2hDLGtCQUFrQix5REFBYztBQUNoQyxrQkFBa0IseURBQWM7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTs7O0FBR0EsS0FBSzs7QUFFTDs7Ozs7Ozs7VUM5REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ053Qzs7QUFFeEM7QUFDQSxJQUFJLHFEQUFRO0FBQ1osQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9vZGluLy4vc3JjL1RvRG9JdGVtLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3Rfb2Rpbi8uL3NyYy9Ub0RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X29kaW4vLi9zcmMvZG9tLWxvYWRlci5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X29kaW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9vZGluL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b19kb19saXN0X29kaW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b19kb19saXN0X29kaW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b19kb19saXN0X29kaW4vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9Eb0l0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGNvbXBsZXRlZCkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgfVxufVxuXG5jb25zdCBjcmVhdGVUb0RvSXRlbSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcykgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBuZXcgVG9Eb0l0ZW0odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMpO1xuICAgIHJldHVybiBpdGVtO1xufVxuXG5leHBvcnQgeyBjcmVhdGVUb0RvSXRlbSB9OyIsImltcG9ydCB7IGNyZWF0ZVRvRG9JdGVtIH0gZnJvbSAnLi9Ub0RvSXRlbSc7XG5cbmNsYXNzIFRvRG9MaXN0IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICB9XG4gICAgYWRkSXRlbShpdGVtKSB7XG5cbiAgICAgICAgdGhpcy5saXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIGdldCBpdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdDtcbiAgICB9XG5cbn1cblxuXG5jb25zdCBjcmVhdGVfdG9fZG9fbGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCB0b19kb19saXN0ID0gbmV3IFRvRG9MaXN0KCk7XG4gICAgcmV0dXJuIHRvX2RvX2xpc3Q7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZV90b19kb19saXN0IH07IiwiaW1wb3J0IHsgY3JlYXRlX3RvX2RvX2xpc3QgfSBmcm9tIFwiLi9Ub0RvTGlzdFwiO1xuaW1wb3J0IHsgY3JlYXRlVG9Eb0l0ZW0gfSBmcm9tICcuL1RvRG9JdGVtJztcbmNvbnN0IGxvYWRMaXN0c0Zyb21TdG9yYWdlID0gKHRvX2RvX2xpc3QpID0+IHtcblxuXG4gICAgY29uc3QgdG9fZG9fbGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvX2RvX2xpc3RzXCIpO1xuXG5cbiAgICBsZXQgdG9Eb0xpc3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b0RvTGlzdHNcIik7XG4gICAgdG9Eb0xpc3RzID0gSlNPTi5wYXJzZSh0b0RvTGlzdHMpO1xuICAgIGNvbnNvbGUubG9nKFwidG9Eb0xpc3RzXCIsIHRvRG9MaXN0cylcbiAgICB0b0RvTGlzdHMuZm9yRWFjaCgodG9kb2xpc3QpID0+IHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvZG9saXN0Lmxpc3QuZm9yRWFjaCgodG9kbykgPT4ge1xuXG5cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRvZG8pIHtcblxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwidGl0bGVcIiB8fCBrZXkgPT09IFwiZHVlRGF0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGkudGV4dENvbnRlbnQgPSBgJHtrZXl9OiAke3RvZG9ba2V5XX1gO1xuXG4gICAgICAgICAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh1bClcbiAgICAgICAgICAgIGNvbnN0IHRvZG9saXN0c0NvbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvX2RvX2xpc3RzXCIpO1xuICAgICAgICAgICAgdG9kb2xpc3RzQ29udC5hcHBlbmRDaGlsZChkaXYpO1xuXG4gICAgICAgIH0pXG4gICAgfSlcblxufVxuXG5jb25zdCBsb2FkUGFnZSA9ICgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICBsZXQgdG9Eb0xpc3RzID0gW107XG4gICAgY29uc3QgdG9fZG9fbGlzdCA9IGNyZWF0ZV90b19kb19saXN0KCk7XG4gICAgY29uc3QgdG9kbzEgPSBjcmVhdGVUb0RvSXRlbShcInRvZG8xXCIsIFwiZGVzY3JpcHRpb24xXCIsIERhdGUubm93KCksIFwiTG93XCIsIFwiV3JpdGUgc29tZSBub3Rlc1wiKTtcbiAgICBjb25zdCB0b2RvMiA9IGNyZWF0ZVRvRG9JdGVtKFwidG9kbzJcIiwgXCJkZXNjcmlwdGlvbjJcIiwgRGF0ZS5ub3coKSwgXCJMb3dcIiwgXCJXcml0ZSBzb21lIG5vdGVzXCIpO1xuICAgIGNvbnN0IHRvZG8zID0gY3JlYXRlVG9Eb0l0ZW0oXCJ0b2RvM1wiLCBcImRlc2NyaXB0aW9uM1wiLCBEYXRlLm5vdygpLCBcIkxvd1wiLCBcIldyaXRlIHNvbWUgbm90ZXNcIik7XG4gICAgdG9fZG9fbGlzdC5hZGRJdGVtKHRvZG8xKTtcbiAgICB0b19kb19saXN0LmFkZEl0ZW0odG9kbzIpO1xuICAgIHRvX2RvX2xpc3QuYWRkSXRlbSh0b2RvMyk7XG5cbiAgICBjb25zb2xlLmxvZygndG9fZG9fbGlzdCcsIHRvX2RvX2xpc3QpXG4gICAgdG9Eb0xpc3RzLnB1c2godG9fZG9fbGlzdCk7XG4gICAgdG9Eb0xpc3RzID0gSlNPTi5zdHJpbmdpZnkodG9Eb0xpc3RzKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRvRG9MaXN0c1wiLCB0b0RvTGlzdHMpO1xuICAgIGNvbnN0IGFkZF90b19kb19saXN0X0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkX3RvX2RvX2xpc3RcIik7XG4gICAgbG9hZExpc3RzRnJvbVN0b3JhZ2UoKTtcblxuXG5cblxuICAgIGFkZF90b19kb19saXN0X0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cblxuICAgIH0pO1xuXG59XG5cbmV4cG9ydCB7IGxvYWRQYWdlIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsb2FkUGFnZSB9IGZyb20gJy4vZG9tLWxvYWRlcic7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIChldmVudCkgPT4ge1xuICAgIGxvYWRQYWdlKCk7XG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=