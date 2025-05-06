import { v4 as uuid } from "uuid";
export default class Todo {
  id;
  title;
  description;
  date;
  priority;

  constructor(title, description, date, priority) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;

    console.log("Created new todo with id: " + this.id);
  }
}
