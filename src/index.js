import ProjectManager from "./project-manager.js";
import Project from "./project.js";
import Todo from "./todo.js";

let defaultProject = new Project("default");
ProjectManager.add(defaultProject);
defaultProject.add(new Todo("default", "", new Date(), "Normal"));
