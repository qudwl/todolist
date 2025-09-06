import styles from "./Todos.module.scss";
import EnterTodo from "./component/EnterTodo";
import Todo from "./component/Todo";
import { db } from "../../store/todoStore";
import { useLiveQuery } from "dexie-react-hooks";

const Todos = () => {

    const todos = useLiveQuery(async () => {
        return await db.todos.where({ list: 0 }).reverse().sortBy("lastEdit");
    })

    const addTodo = (todo: string) => {
        try {
            db.todos.add({
                text: todo,
                completed: false,
                starred: false,
                lastEdit: new Date().getTime(),
                due: -1,
                list: 0,
            }).then(val => {
                console.log(`Todo with ID: ${val} was added.`)
            })
        } catch (err) {
            console.error(err);
        }
    }

    return <div className={styles.todos}>
        <EnterTodo addTodo={addTodo} />
        <ul>
            {todos?.map((todo) => (
                <Todo key={`todo-${todo.id}`} {...todo} />
            ))}
        </ul>
    </div>;
}

export default Todos;