import TodoList from "./logic";
import { content, listInput } from "..";
import { format } from "date-fns";
import userTab from "./user-tab";

export default class DOM {
  static addTask(task) {
    const taskContainer = document.createElement("div");
    const completeContainer = document.createElement("div");
    const titleContainer = document.createElement("div");
    const dateContainer = document.createElement("div");
    const priorityContainer = document.createElement("div");

    if (task.list !== "none" && content.id !== "user-tab")
      taskContainer.classList.add("task-of-list");

    taskContainer.classList.add("task-container");
    completeContainer.classList.add("complete-container");
    titleContainer.classList.add("title-container");
    dateContainer.classList.add("date-container");
    priorityContainer.classList.add("priority-container");

    titleContainer.textContent = task.title;
    dateContainer.textContent = task.date;
    priorityContainer.textContent = "Important";

    completeContainer.onclick = () => {
      if (
        task.list !== "none" &&
        taskContainer.parentElement.childElementCount === 2
      )
        taskContainer.parentElement.classList.add("active");
      completeContainer.classList.add("active");
      taskContainer.classList.add("active");
      setTimeout(function () {
        if (
          task.list !== "none" &&
          taskContainer.parentElement.childElementCount === 2 &&
          content.id !== "user-tab"
        ) {
          content.removeChild(taskContainer.parentElement);
        } else if (task.list !== "none" && content.id !== "user-tab") {
          taskContainer.parentElement.removeChild(taskContainer);
        } else {
          content.removeChild(taskContainer);
        }
        if (content.childElementCount === 1) {
          const noTasksinfo = document.createElement("div");
          noTasksinfo.id = "no-tasks-info";
          noTasksinfo.textContent = "There are no tasks to display in this tab";
          content.appendChild(noTasksinfo);
        }
      }, 200);

      TodoList.remove(task.index);
    };

    taskContainer.appendChild(completeContainer);
    if (task.date !== "")
      (dateContainer.textContent = format(task.date, "ccc dd MMM")),
        taskContainer.appendChild(dateContainer);
    taskContainer.appendChild(titleContainer);
    if (task.priority === true) taskContainer.appendChild(priorityContainer);

    return taskContainer;
  }

  static addTabList(list) {
    let userTabs = JSON.parse(localStorage.getItem("userTabs"));
    if (userTabs === null) userTabs = [];

    const userlistContainer = document.createElement("div");
    const userListIcon = document.createElement("img");
    const userListName = document.createElement("div");
    const option = document.createElement("option");
    userlistContainer.classList.add("user-list", "active");
    userListIcon.classList.add("user-tab-icon");
    userListName.textContent = list;
    option.textContent = list;
    option.value = list;
    userlistContainer.append(userListIcon, userListName);
    listInput.appendChild(option);

    userlistContainer.addEventListener("click", () => {
      userTab.initTab(list);
    });

    return userlistContainer;
  }

  static addContentList(list) {
    const listContainer = document.createElement("div");
    const listHeader = document.createElement("div");
    listContainer.classList.add("list-container");
    listHeader.classList.add("list-header");
    listHeader.textContent = list;
    listContainer.appendChild(listHeader);
    return listContainer;
  }
}
