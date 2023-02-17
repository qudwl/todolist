import Todo from "./Todo";

class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
    this.count = 0;
  }

  addTodo(title, priority = 0) {
    const td = new Todo(title, priority, this.count);
    this.count++;
    this.todos.push(td);
    console.log(this);
    return td;
  }

  get length() {
    return this.todos.length;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  /**
   * Get todo at index of.
   * @param {number} index
   */
  at(index) {
    for (let i = 0; i < this.length; i++) {
      if (index == this.todos[i].index) {
        return this.todos[i];
      }
    }

    console.log("Could not find.");
  }
}

export default Project;
