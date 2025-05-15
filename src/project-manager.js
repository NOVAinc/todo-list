import Project from "./project.js";
import Todo from "./todo.js";
import Reviver from "./revivers.js";

export default class Manager {
  static projects = [];

  static initialize() {
    // Fetch locally stored data
    if (localStorage.getItem("projectArray")) {
      this.projects = JSON.parse(localStorage.getItem("projectArray"));
    } else {
      console.log("Nothing in local Storage");
      this.add(new Project("default"));
      this.projects[0].add(new Todo());
    }

    // Add methods to loaded projects
    for (let project of this.projects) {
      Reviver.addProjectMethods(project);
    }
  }

  static add(project) {
    // Add methods to new project
    Reviver.addProjectMethods(project);

    Manager.projects.push(project);

    console.log("Added a project to the manager");
    console.table(Manager.projects);

    Manager.updateLocalStorage();
  }

  static update(oldProject, newProject) {
    let projectIndex = Manager.projects.indexOf(oldProject);
    Manager.projects.splice(projectIndex, 1, newProject);

    console.log("Updated a project in the manager");
    console.table(Manager.projects);

    Manager.updateLocalStorage();
  }

  static remove(project) {
    let projectIndex = Manager.projects.indexOf(project);
    Manager.projects.splice(projectIndex, 1);

    console.log("Removed a project from the manager");
    console.table(Manager.projects);

    Manager.updateLocalStorage();
  }

  static updateLocalStorage() {
    localStorage.setItem("projectArray", JSON.stringify(Manager.projects));
  }
}
