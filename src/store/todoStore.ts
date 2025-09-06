import Dexie, { type EntityTable } from "dexie";

interface Todo {
  id: number;
  text: string;
  starred: boolean;
  completed: boolean;
  lastEdit: number;
  due: number;
  list: number;
}

interface TodoList {
  id: number;
  name: string;
}

const db = new Dexie("todolist") as Dexie & {
  todos: EntityTable<Todo, "id">;
  todoLists: EntityTable<TodoList, "id">;
};

db.version(1).stores({
  todos: "++id, text, starred, completed, lastEdit, due, list",
  todoLists: "++id, name",
});

export type { Todo };
export { db };
