import { useState } from "react";
import styles from "./Todos.module.scss";
import EnterTodo from "./component/EnterTodo";

const Todos = () => {
    const [todos, setTodos] = useState<string[]>([]);

    const addTodo = (todo: string) => {
        setTodos([...todos, todo]);
    }

    return <div className={styles.todos}>
        {todos.map((todo, index) => (
            <div key={index}>{todo}</div>
        ))}
        <EnterTodo addTodo={addTodo} />
    </div>;
}

export default Todos;