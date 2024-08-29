import "./style.css";
import TodoList from "./modules/logic";
import today from "./modules/today";
import week from "./modules/week";
import important from "./modules/important";
import all from "./modules/all";
export {
  content,
  newTaskBtn,
  newTaskWindow,
  priorityInput,
  titleInput,
  dateInput,
  inputs,
  listInput,
  userTabs,
};

const todayBtn = document.querySelector("#today-btn");
const weekBtn = document.querySelector("#week-btn");
const importantBtn = document.querySelector("#important-btn");
const allBtn = document.querySelector("#all-btn");
const userTabs = document.querySelector(".user-tabs");
const content = document.querySelector(".content");
const newTaskBtn = document.querySelector("#new-task-btn");
const newTaskWindow = document.querySelector(".new-task-window");
const createTaskBtn = document.querySelector("#create-task-btn");
const titleInput = document.querySelector("#title");
const dateInput = document.querySelector("#date");
const priorityInput = document.querySelector("#priority");
const listInput = document.querySelector("#list");
const inputs = document.querySelectorAll("input");
const closingBtn = document.querySelector("#closing-btn");
const newListInput = document.querySelector("#new-list");
const createListBtn = document.querySelector("#create-list-btn");

newTaskBtn.addEventListener("click", () => {
  newTaskWindow.classList.add("active");
});

closingBtn.addEventListener("click", () => {
  newTaskWindow.classList.remove("active");
  listInput.selectedIndex = 0;
  inputs.forEach((input) => {
    if (input.type === "checkbox") input.checked = false;
    else input.value = "";
  });
});

createTaskBtn.addEventListener("click", () => {
  if (
    titleInput.checkValidity() === true &&
    titleInput.value.split("").filter((char) => char !== " ").length !== 0
  ) {
    const nextWeek = new Date();
    nextWeek.setDate(new Date().getDate() + 7);

    new TodoList(
      titleInput.value,
      dateInput.value,
      priorityInput,
      listInput.value,
    );
    newTaskWindow.classList.remove("active");
    listInput.selectedIndex = 0;
    inputs.forEach((input) => {
      if (input.type === "checkbox") input.checked = false;
      else input.value = "";
    });
  }
});

createListBtn.addEventListener("click", () => {
  if (
    newListInput.checkValidity() === true &&
    newListInput.value.split("").filter((char) => char !== " ").length !== 0
  ) {
    let allListsArr = JSON.parse(localStorage.getItem("lists"));
    if (allListsArr === null) allListsArr = [];
    const sameNameList = allListsArr.filter(
      (list) => list === newListInput.value,
    );

    if (sameNameList.length === 0) {
      userTabs.append(TodoList.createTabList(newListInput.value));
    }

    newListInput.value = "";
    newListInput.blur();
  }
});

todayBtn.addEventListener("click", () => {
  today.initTab();
});

weekBtn.addEventListener("click", () => {
  week.initTab();
});

importantBtn.addEventListener("click", () => {
  important.initTab();
});

allBtn.addEventListener("click", () => {
  all.initTab();
});

all.initTab();
TodoList.initUserLists();
