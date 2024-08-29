import DOM from "./DOM";
import { content } from "..";
import all from "./all";
import today from "./today";
import important from "./important";
import week from "./week";
import userTab from "./user-tab";

export default class TodoList {
  constructor(title, date, priority, list) {
    this.title = title;
    this.date = date;
    this.priority = priority;
    this.list = list;
    this.index = TodoList.#index();

    this.create();
    console.log(this.date);
  }

  static #index() {
    let index = JSON.parse(localStorage.getItem("index"));
    if (index === null) index = 0;
    else index++;
    localStorage.setItem("index", JSON.stringify(index));
    return index;
  }

  static initWebpage(element) {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    if (allTasks !== null)
      for (let task of allTasks) {
        element.appendChild(DOM.addTask(task));
      }
  }

  static initUserLists() {
    let allLists = JSON.parse(localStorage.getItem("lists"));
    if (allLists !== null) {
      for (let list of allLists) {
        userTab.initSidebarTabs(list);
      }
    }
  }

  static createTabList(name) {
    let allLists = JSON.parse(localStorage.getItem("lists"));
    if (allLists === null) allLists = [];
    allLists.push(name);
    localStorage.setItem("lists", JSON.stringify(allLists));
    return DOM.addTabList(name);
  }

  static remove(index) {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    allTasks = allTasks.filter((obj) => obj.index !== index);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }

  static read() {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    if (allTasks === null) allTasks = [];
    console.log(allTasks);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }

  create() {
    let allListsArr = JSON.parse(localStorage.getItem("lists"));
    if (allListsArr === null) allListsArr = [];

    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    if (allTasks === null) allTasks = [];

    if (this.priority.checked) this.priority = true;
    else this.priority = false;

    const newTask = {
      title: this.title,
      date: this.date,
      priority: this.priority,
      list: this.list,
      index: this.index,
    };

    allTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    switch (content.id) {
      case "today":
        today.addTask(newTask);
        break;
      case "week":
        week.addTask(newTask);
        break;
      case "important":
        important.addTask(newTask);
        break;
      case "all":
        all.addTask(newTask);
        break;
      case "user-tab":
        userTab.addTask(newTask);
    }
  }

  update(parameter) {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    allTasks[this.index][`${parameter}`] = "johny";
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }
}
