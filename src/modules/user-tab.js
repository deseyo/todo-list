import { content, userTabs, listInput } from "..";
import DOM from "./DOM";

export default class userTab {
  static initSidebarTabs(list) {
    const userListContainer = document.createElement("div");
    const userListIcon = document.createElement("img");
    const userListName = document.createElement("div");
    const option = document.createElement("option");
    userListContainer.classList.add("user-list", "active");
    userListIcon.classList.add("user-tab-icon");
    userListName.textContent = list;
    option.textContent = list;
    option.value = list;
    userListContainer.append(userListIcon, userListName);
    listInput.appendChild(option);

    userListContainer.addEventListener("click", () => {
      userTab.initTab(list);
    });

    userTabs.appendChild(userListContainer);
  }

  static initTab(list) {
    let allTasksArr = JSON.parse(localStorage.getItem("tasks"));
    if (allTasksArr === null) allTasksArr = [];

    content.innerHTML = "";
    content.id = "user-tab";

    const tabHeader = document.createElement("div");

    tabHeader.classList.add("tab-header");
    tabHeader.textContent = list;
    content.appendChild(tabHeader);

    for (let task of allTasksArr) {
      if (task.list === list) content.appendChild(DOM.addTask(task));
    }

    if (content.childElementCount === 1) {
      const noTasksinfo = document.createElement("div");
      noTasksinfo.id = "no-tasks-info";
      noTasksinfo.textContent = "There are no tasks to display in this tab";
      content.appendChild(noTasksinfo);
    }
  }

  static addTask(task) {
    if (content.firstChild.textContent === task.list) {
      if (content.lastChild.id === "no-tasks-info")
        content.removeChild(content.lastChild);
      content.appendChild(DOM.addTask(task));
    }
  }
}
