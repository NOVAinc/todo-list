import Manager from "./project-manager";

const projectMethods = {
  add: function (todo) {
    this.todos.push(todo);

    console.log("Added new todo to the project");
    console.table(this.todos);
    Manager.updateLocalStorage();
  },
  remove: function (todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);

    console.log("Removed todo from the project");
    console.table(this.todos);
  },
  update: function (oldTodo, newTodo) {
    this.todos.splice(this.todos.indexOf(oldTodo), 1, newTodo);

    console.log("Updated todo in the project");
    console.table(this.todos);
  },
};

export default class Reviver {
  static projectMethodEntries = Object.entries(projectMethods);
  static addProjectMethods(project) {
    for (let entry of this.projectMethodEntries) {
      project[entry[0]] = entry[1];
      console.log(entry[0] + ": " + entry[1]);
      console.log(project);
    }
  }
}
