import { v4 as uuid } from "uuid";

export default class Project {
  id;
  title;
  todos = [];
  constructor(title) {
    this.title = title;
    this.id = uuid();
  }

  add(todo) {
    this.todos.push(todo);

    console.log("Added new todo to the project");
    console.table(this.todos);
  }

  update(oldTodo, newTodo) {
    this.todos.splice(this.todos.indexOf(oldTodo), 1, newTodo);

    console.log("Updated todo in the project");
    console.table(this.todos);
  }

  remove(todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);

    console.log("Removed todo from the project");
    console.table(this.todos);
  }
}
