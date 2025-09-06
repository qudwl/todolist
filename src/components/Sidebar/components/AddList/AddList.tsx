import { useState } from "react";
import styles from "./AddList.module.scss"
import { FaPlus } from "react-icons/fa";
import { db } from "../../../../store/todoStore";

const AddList = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [newListName, setNewListName] = useState("");

    const addNewList = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await db.todoLists.add({ name: newListName, lastEdit: new Date().getTime() })
        setNewListName("");
        setIsEditing(false);
    }

    return <li>
        {isEditing ?
            <form onSubmit={addNewList}>
                <label htmlFor="addNewList" className="invisibleText">Add New List</label>
                <input className={styles.addList} type="text" autoFocus placeholder="Enter new list name" value={newListName} onChange={e => setNewListName(e.target.value)} />
            </form>
            : <button className={styles.addList} type="button" onClick={() => setIsEditing(true)}>
                <FaPlus />
                <span>Add New List</span>
            </button>
        }
    </li>
}

export default AddList;