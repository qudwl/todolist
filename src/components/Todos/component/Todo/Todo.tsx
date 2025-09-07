import styles from "./Todo.module.scss";
import { db } from "../../../../store/todoStore";
import { FaRegStar, FaRegSquare, FaRegTrashCan, FaRegSquareCheck } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import type { Todo as TodoProps } from "../../../../store/todoStore";
import ChangeList from "./components/ChangeList/ChangeList";
import { useLiveQuery } from "dexie-react-hooks";

const Todo: React.FC<TodoProps> = ({ text, completed, id, lastEdit, starred, list }) => {
    const iconSize = "16px";

    const [newText, setNewText] = useState(text);
    const [editing, setEditing] = useState(false);

    const completeItem = () => {
        const newCompleted = completed === 0 ? 1 : 0;
        try {
            db.todos.update(id, { completed: newCompleted, lastEdit: new Date().getTime() })
        } catch (err) {
            console.error(err);
        }
    }

    const smallListHeading = useLiveQuery(async () => {
        return await db.todoLists.where({ id: list }).first();
    })

    const deleteItem = () => {
        try {
            db.todos.delete(id);
        } catch (err) {
            console.error(err);
        }
    }

    const starItem = () => {
        const newStarred = starred === 0 ? 1 : 0;
        try {
            db.todos.update(id, { starred: newStarred, lastEdit: new Date().getTime() })
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
                    <button type="button" className={completed === 1 ? styles.completed : undefined} aria-description="Edit todo" onClick={enableEditing}>
                        {text}
                    </button>
                }
                <p>{dateString()}{list !== 0 && `| ${smallListHeading?.name}`}</p>
            </div>
            <div className={styles.buttonList}>
                <ChangeList id={id} listId={list} />
                <button type="button" onClick={completeItem}>{completed === 1 ? <FaRegSquareCheck size={iconSize} /> : <FaRegSquare size={iconSize} title="" />}</button>
                <button type="button" onClick={deleteItem}><FaRegTrashCan size={iconSize} /></button>
                <button type="button" onClick={starItem} className={starred === 1 ? styles.starred : undefined}>{starred === 1 ? <FaStar size={iconSize} /> : <FaRegStar size={iconSize} />}</button>
            </div>
        </li>
    );
}

export default Todo;