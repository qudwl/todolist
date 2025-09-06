import styles from "./Todo.module.scss";
import type { TodoProps } from "./types";
import { FaRegStar, FaRegSquare, FaRegTrashCan } from "react-icons/fa6";

const Todo: React.FC<TodoProps> = ({ todo }) => {
    const iconSize = "16px";
    return (
        <li className={styles.todo}>
            <button>
                {todo}
            </button>
            <div className={styles.buttonList}>
                <button><FaRegSquare size={iconSize} title="" /></button>
                <button><FaRegTrashCan size={iconSize} /></button>
                <button><FaRegStar size={iconSize} /></button>
            </div>
        </li>
    );
}

export default Todo;