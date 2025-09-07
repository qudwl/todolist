import styles from "./ChangeList.module.scss"
import type { ChangeListProps } from "./types"
import { db } from "../../../../../../store/todoStore"
import { useState } from "react"
import { PiCaretDown } from "react-icons/pi";
import cn from "classnames"
import { FaCheck } from "react-icons/fa6"
import { useLiveQuery } from "dexie-react-hooks";

const ListOption = ({ id, name, todoId, setExpanded, selected }: { id: number, name: string, todoId: number, setExpanded: (arg: boolean) => void, selected: boolean }) => {
    const onClick = () => {
        try {
            db.todos.update(todoId, { list: id })
            setExpanded(false);
        } catch (err) {
            console.log(err)
        }
    }
    return <button tabIndex={-1} type="button" role="option" className={cn(selected && styles.selected)} onClick={onClick}>
        {selected && <FaCheck />}
        <span>{name}</span>
    </button>
}

const ChangeList: React.FC<ChangeListProps> = ({ id, listId }) => {
    const [expanded, setExpanded] = useState(false)

    const lists = useLiveQuery(async () => {
        return await db.todoLists.toArray()
    });

    if (lists === undefined) return null;
    else if (lists.length === 0) return null;
    else return (
        <div className={cn(styles.changeList, expanded && styles.open)}>
            <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
                <PiCaretDown size="16px" />
            </button>
            <ul className={styles.listSelector}>
                <li key={0} role="option"><ListOption id={0} name="Default" todoId={id} setExpanded={setExpanded} selected={listId === 0} /></li>
                {lists.map((list) => {
                    return (
                        <li role="option" key={list.id}><ListOption id={list.id} name={list.name} todoId={id} setExpanded={setExpanded} selected={listId === list.id} /></li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ChangeList;