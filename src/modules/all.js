import DOM from "./DOM";
import { content } from "..";

export default class all {
  static initTab() {
    content.innerHTML = "";
    content.id = "all";

    const tabHeader = document.createElement("div");

    tabHeader.classList.add("tab-header");
    tabHeader.textContent = "All Tasks";

    content.appendChild(tabHeader);

    let allListsArr = JSON.parse(localStorage.getItem("lists"));    
    let allTasksArr = JSON.parse(localStorage.getItem("tasks"));    

    if (allListsArr === null) allListsArr = [];
    if (allTasksArr === null) allTasksArr = [];

    for (let listName of allListsArr) {
      const listCont = document.createElement("div");
      const listHeader = document.createElement("div");
      listCont.classList.add("list-container");
      listHeader.classList.add("list-header");
      listHeader.innerHTML = listName;
      listCont.appendChild(listHeader);
      const listTasks = allTasksArr.filter((task) => task.list === listName);
      for (let task of listTasks) listCont.appendChild(DOM.addTask(task));
      if (listTasks.length !== 0) content.appendChild(listCont);
    }

    const noneTasks = allTasksArr.filter((task) => task.list === "none");
    for (let task of noneTasks) content.appendChild(DOM.addTask(task));

    if (content.childElementCount === 1) {
      const noTasksinfo = document.createElement("div");
      noTasksinfo.id = "no-tasks-info";
      noTasksinfo.textContent = "There are no tasks to display in this tab";
      content.appendChild(noTasksinfo);
    }
  }

  static addTask(task) {
    if (content.lastChild.id === "no-tasks-info")
      content.removeChild(content.lastChild);
    if (task.list !== "none") {
      let listContainer;
      for (let node of content.childNodes) {
        for (let childNode of node.childNodes) {
          if (
            childNode.textContent === task.list &&
            childNode.className === "list-header"
          )
            listContainer = node;
          break;
        }
      }
      if (listContainer === undefined) {
        listContainer = DOM.addContentList(task.list);
        listContainer.appendChild(DOM.addTask(task));

        let lastListContainer;
        for (let node of content.childNodes) {
          if (node.className === "list-container") lastListContainer = node;
        }

        if (lastListContainer === undefined) {
          let firstTask;
          for (let node of content.childNodes) {
            if (node.className === "task-container") {
              firstTask = node;
              break;
            }
          }
          if (firstTask === undefined) content.appendChild(listContainer);
          else content.insertBefore(listContainer, firstTask);
        } else {
          content.insertBefore(listContainer, lastListContainer.nextSibling);
        }
      } else listContainer.appendChild(DOM.addTask(task));
    } else content.appendChild(DOM.addTask(task));
  }
}
