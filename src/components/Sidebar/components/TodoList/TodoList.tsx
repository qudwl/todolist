import ListItem from "../ListItem";
import type { TodoListProps } from "./types"

const TodoList: React.FC<TodoListProps> = ({ name, selected, onClick }) => {
    return (
        <ListItem selected={selected} name={name} onClick={onClick} />
    )
}

export default TodoList;