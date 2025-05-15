import { v4 as uuid } from "uuid";
export default class Todo {
  id;
  title;
  description;
  date;
  priority;
  done;

  constructor(
    title = "New todo",
    description = "",
    date = new Date(),
    priority = "Normal"
  ) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.done = false;

    console.log("Created new todo with id: " + this.id);
  }
}
