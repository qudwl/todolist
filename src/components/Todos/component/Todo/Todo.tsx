import styles from "./Todo.module.scss";
import { db, type Todo } from "../../../../store/todoStore";
import { FaRegStar, FaRegSquare, FaRegTrashCan, FaRegSquareCheck } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const Todo: React.FC<Todo> = ({ text, completed, id, lastEdit, starred }) => {
    const iconSize = "16px";

    const [newText, setNewText] = useState(text);
    const [editing, setEditing] = useState(false);

    const completeItem = () => {
        try {
            db.todos.update(id, { completed: !completed, lastEdit: new Date().getTime() })
        } catch (err) {
            console.error(err);
        }
    }

    const deleteItem = () => {
        try {
            db.todos.delete(id);
        } catch (err) {
            console.error(err);
        }
    }

    const starItem = () => {
        try {
            db.todos.update(id, { starred: !starred, lastEdit: new Date().getTime() })
        } catch (err) {
            console.error(err);
        }
    }

    const editItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            db.todos.update(id, { text: newText, lastEdit: new Date().getTime() })
            setEditing(false)
        } catch (err) {
            console.error(err);
        }
    }

    const enableEditing = () => {
        setEditing(!editing);
    }

    const dateString = () => {
        const currentDate = new Date().getTime();

        const diff = currentDate - lastEdit;

        // Under 60 seconds
        if (diff <= 60000) return "just now"
        // Under 1 hour
        else if (diff <= 3_600_000) {
            const minutes = Math.floor(diff / 1000 / 60)
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
        }
        // Under 1 day
        else if (diff <= 86_400_000) {
            const hours = Math.floor(diff / 1000 / 60 / 60);
            const minutes = Math.floor((diff - (hours * 1000 * 60 * 60)) / 1000 / 60)
            return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}`
        }
    }

    return (
        <li className={styles.todo}>
            <div>
                {editing ?
                    <form onSubmit={editItem}>
                        <label className="invisibleText" htmlFor={`newTodo-${id}`}>Edit Todo text</label>
                        <input autoFocus type="text" name={`newTodo-${id}`} id={`newTodo-${id}`} value={newText} onChange={e => setNewText(e.target.value)} />
                    </form>
                    :
                    <button type="button" className={completed ? styles.completed : undefined} aria-description="Edit todo" onClick={enableEditing}>
                        {text}
                    </button>
                }
                <p>{dateString()}</p>
            </div>
            <div className={styles.buttonList}>
                <button type="button" onClick={completeItem}>{completed ? <FaRegSquareCheck size={iconSize} /> : <FaRegSquare size={iconSize} title="" />}</button>
                <button type="button" onClick={deleteItem}><FaRegTrashCan size={iconSize} /></button>
                <button type="button" onClick={starItem} className={starred ? styles.starred : undefined}>{starred ? <FaStar size={iconSize} /> : <FaRegStar size={iconSize} />}</button>
            </div>
        </li>
    );
}

export default Todo;