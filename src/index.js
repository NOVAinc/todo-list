import ProjectManager from "./project-manager.js";
import Project from "./project.js";
import Todo from "./todo.js";
import DOMManager from "./dom-manager.js";
import "./styles.css";

const ACTIVE_PROJECT = null;

// Start the project manager, including fetching locally stored projects
ProjectManager.initialize();

// Start the UI
DOMManager.initialize();
