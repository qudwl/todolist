class Todo {
  /**
   *
   * @param {string} title
   * @param {number} priority
   */
  constructor(title, priority, index) {
    this.title = title;
    this.priority = priority;
    this.index = index;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    this._priority = priority;
  }

  get index() {
    return this._index;
  }

  set index(index) {
    this._index = index;
  }
}

export default Todo;
