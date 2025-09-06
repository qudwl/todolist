import styles from "./Todos.module.scss";
import EnterTodo from "./component/EnterTodo";
import Todo from "./component/Todo";
import { db } from "../../store/todoStore";
import { useLiveQuery } from "dexie-react-hooks";
import type { TodosProps } from "./types";

const Todos: React.FC<TodosProps> = ({ list }) => {

    const todos = useLiveQuery(async () => {
        try {
            switch (list) {
                case -3:
                    return await db.todos.reverse().sortBy("lastEdit");
                case -2:
                    return await db.todos.where({ completed: 0 }).reverse().sortBy("lastEdit");
                case -1:
                    return await db.todos.where({ completed: 1 }).reverse().sortBy("lastEdit");
                default:
                    return await db.todos.where({ list: list }).reverse().sortBy("lastEdit");
            }

        } catch (err) {
            console.log(err);
            return [];
        }
    }, [list])

    const addTodo = (todo: string) => {
        try {
            db.todos.add({
                text: todo,
                completed: 0,
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