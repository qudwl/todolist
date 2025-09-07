import Dexie, { type EntityTable } from "dexie";

interface Todo {
  id: number;
  text: string;
  starred: number; // 0 is false, 1 is true.
  completed: number; // 0 is false, 1 is true.
  lastEdit: number;
  due: number; // -1 means does not have a due date.
  list: number;
}

interface TodoList {
  id: number;
  name: string;
  lastEdit: number;
}

const db = new Dexie("todolist") as Dexie & {
  todos: EntityTable<Todo, "id">;
  todoLists: EntityTable<TodoList, "id">;
};

db.version(1).stores({
  todos: "++id, text, starred, completed, lastEdit, due, list",
  todoLists: "++id, name, lastEdit",
});

export type { Todo, TodoList };
export { db };
