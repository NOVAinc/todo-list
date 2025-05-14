import { v4 as uuid } from "uuid";

export default class Project {
  id;
  title;
  todos = [];
  constructor(title) {
    this.title = title;
    this.id = uuid();
  }
}
