import type { TodoList } from "../../../../store/todoStore";

export interface TodoListProps extends TodoList {
  selected: boolean;
  onClick: () => void;
}
