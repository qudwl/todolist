import styles from "./Sidebar.module.scss";
import cn from "classnames"
import type { SidebarProps } from "./types";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../store/todoStore";
import TodoList from "./components/TodoList";
import ListItem from "./components/ListItem";
import { CiBoxList } from "react-icons/ci";
import AddList from "./components/AddList";
import { FaRegCheckSquare, FaRegSquare, FaStar } from "react-icons/fa";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, list, setList }) => {

    const lists = useLiveQuery(async () => {
        return await db.todoLists.toArray();
    });

    return (
        <div className={cn(styles.sidebar, isOpen && styles.isOpen)}>
            <ul className={styles.list}>
                <ListItem selected={list === -4} icon={CiBoxList} name="All" onClick={() => setList(-4)} />
                <ListItem selected={list === -3} icon={FaRegSquare} name="Todo" onClick={() => setList(-3)} />
                <ListItem selected={list === -2} icon={FaRegCheckSquare} name="Done" onClick={() => setList(-2)} />
                <ListItem selected={list === -1} icon={FaStar} name="Starred" onClick={() => setList(-1)} />
            </ul>
            <div className={styles.line} />
            <ul className={styles.list}>
                {lists?.map((item) => {
                    return <TodoList key={item.id} {...item} selected={list === item.id} onClick={() => setList(item.id)} />
                })}
                <AddList />
            </ul>
        </div>
    );
}

export default Sidebar;