export default class Manager {
  static projects = [];

  static add(project) {
    Manager.projects.push(project);

    console.log("Added a project to the manager");
    console.table(Manager.projects);
  }

  static update(oldProject, newProject) {
    let projectIndex = Manager.projects.indexOf(oldProject);
    Manager.projects.splice(projectIndex, 1, newProject);

    console.log("Updated a project in the manager");
    console.table(Manager.projects);
  }

  static remove(project) {
    let projectIndex = Manager.projects.indexOf(project);
    Manager.projects.splice(projectIndex, 1);

    console.log("Removed a project from the manager");
    console.table(Manager.projects);
  }
}
