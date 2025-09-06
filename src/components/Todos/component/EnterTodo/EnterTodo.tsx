import { FaPlus } from "react-icons/fa";
import styles from "./EnterTodo.module.scss";
import { useState } from "react";
import cn from "classnames";
import type { EnterTodoProps } from "./types";

const EnterTodo: React.FC<EnterTodoProps> = ({ addTodo }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.length === 0) return;
        else {
            addTodo(text);
            setText("");
        }
    }

    return (
        <form className={styles.enterTodo} onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter a new todo..." value={text} onChange={e => setText(e.target.value)} />
            <button type="submit" className={cn(text.length > 0 && styles.visibleButton)}><FaPlus title="Add todo" /></button>
        </form>
    );
}

export default EnterTodo;