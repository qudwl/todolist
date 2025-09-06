import { useState } from "react";
import styles from "./Todos.module.scss";
import EnterTodo from "./component/EnterTodo";
import Todo from "./component/Todo";

const Todos = () => {
    const [todos, setTodos] = useState<string[]>([]);

    const addTodo = (todo: string) => {
        setTodos([...todos, todo]);
    }

    return <div className={styles.todos}>
        <EnterTodo addTodo={addTodo} />
        <ul>
            {todos.slice().reverse().map((todo, index) => (
                <Todo todo={todo} key={`todo-${index}`} />
            ))}
        </ul>
    </div>;
}

export default Todos;