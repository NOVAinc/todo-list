import Manager from "./project-manager";
import Project from "./project";
import Todo from "./todo";

export default class DOMManager {
  static activeProject;
  static activeTodo;
  static initialize() {
    let container = document.getElementById("container");
    let projectList = document.createElement("div");
    projectList.id = "project-list";

    this.activeProject = Manager.projects[0];

    container.appendChild(projectList);
    this.updateProjectList();

    let todoList = document.createElement("ul");
    todoList.id = "todo-list";

    container.appendChild(todoList);
    this.updateTodoList();
  }

  static updateProjectList() {
    // Clear project list
    let projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    // Create project entries
    for (let project of Manager.projects) {
      let projectNode = document.createElement("h2");
      projectNode.innerText = project.title;
      projectNode.classList.add("project");
      projectNode.id = project.id;
      projectNode.addEventListener("click", () => {
        DOMManager.setActiveProject(projectNode.id);
      });

      projectList.appendChild(projectNode);
    }

    // Create and append project form and add button
    let addProjectForm = document.createElement("input");
    addProjectForm.setAttribute("type", "text");
    addProjectForm.classList.add("new-project-name");
    projectList.appendChild(addProjectForm);
    let addProjectButton = document.createElement("button");
    addProjectButton.classList.add("add-project");
    addProjectButton.innerText = "+";
    addProjectButton.addEventListener("click", () => {
      let projectName = document.querySelector(".new-project-name");
      Manager.add(new Project(projectName.value));
      this.updateProjectList(Manager.projects);
    });
    projectList.appendChild(addProjectButton);
    let removeProjectButton = document.createElement("button");
    removeProjectButton.innerText = "-";
    removeProjectButton.classList.add("remove-project");
    removeProjectButton.addEventListener("click", () => {
      Manager.remove(this.activeProject);
      this.updateProjectList();
    });
    projectList.appendChild(removeProjectButton);
  }

  static setActiveProject(id) {
    this.activeProject = Manager.projects.find((obj) => {
      obj.id == id
        ? console.log(
            "Found the active project in the source array: " + obj.title
          )
        : console.log("No active project found yet");
      return obj.id == id;
    });

    let projects = document.getElementsByClassName("project");
    for (let project of projects) {
      if (project.id == id) {
        project.classList.add("active");
      } else {
        project.classList.remove("active");
      }
    }

    DOMManager.updateTodoList();
  }

  static setActiveTodo(id) {
    this.activeTodo = this.activeProject.todos.find((todo) => {
      if (todo.id == id) {
        console.log("Found active todo: " + todo.title);
      } else {
        console.log("Not active todo found yet");
      }
      return id == todo.id;
    });

    let todos = document.getElementsByClassName("todo");
    for (let todo of todos) {
      if (todo.id == id) {
        todo.classList.add("active");
      } else {
        todo.classList.remove("active");
      }
    }
  }

  static updateTodoList() {
    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    console.log("The active project is: ");
    console.table(this.activeProject);

    for (let todo of this.activeProject.todos) {
      let todoNode = document.createElement("li");
      todoNode.classList.add("todo");
      todoNode.id = todo.id;

      todoNode.innerHTML = `<h3 class="todo-title">${todo.title}</h3>`;
      if (todo.description) {
        todoNode.innerHTML += `<div class="todo-description">${todo.description}</div>`;
      }
      todoNode.innerHTML += `
      <div class="todo-date">${todo.date}</div>
      <div class="todo-priority">${todo.priority}</div>
      `;

      todoNode.addEventListener("click", () => {
        this.setActiveTodo(todoNode.id);
      });
      todoList.appendChild(todoNode);
    }

    // Add todo name field
    let todoNameLabel = document.createElement("label");
    let todoField = document.createElement("input");
    todoField.id = "new-todo-name";
    todoNameLabel.innerText = "Todo name";
    todoNameLabel.setAttribute("for", todoField.id);
    todoNameLabel.classList = "new-todo-name-label";
    todoField.setAttribute("type", "text");
    todoList.appendChild(todoNameLabel);
    todoList.appendChild(todoField);

    // Add description field
    let newTodoDescriptionLabel = document.createElement("label");
    let newTodoDescription = document.createElement("input");
    newTodoDescription.id = "new-todo-description";
    newTodoDescriptionLabel.innerText = "Description";
    newTodoDescriptionLabel.setAttribute("for", newTodoDescription.id);
    newTodoDescription.setAttribute("type", "text");
    todoList.appendChild(newTodoDescriptionLabel);
    todoList.appendChild(newTodoDescription);

    // Add todo button
    let newTodoButton = document.createElement("button");
    newTodoButton.innerText = "+";
    newTodoButton.addEventListener("click", () => {
      let todoName = document.getElementById("new-todo-name");
      let todoDescription = document.getElementById("new-todo-description");
      this.activeProject.add(new Todo(todoName.value, todoDescription.value));
      this.updateTodoList();
    });
    todoList.appendChild(newTodoButton);

    // Remove todo button
    let deleteTodoButton = document.createElement("button");
    deleteTodoButton.innerText = "-";
    deleteTodoButton.addEventListener("click", () => {
      this.activeProject.remove(this.activeTodo);
      this.updateTodoList();
    });
    todoList.appendChild(deleteTodoButton);
  }
}
