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
                case -4:
                    return await db.todos.reverse().sortBy("lastEdit");
                case -3:
                    return await db.todos.where({ completed: 0 }).reverse().sortBy("lastEdit");
                case -2:
                    return await db.todos.where({ completed: 1 }).reverse().sortBy("lastEdit");
                case -1:
                    return await db.todos.where({ starred: 1 }).reverse().sortBy("lastEdit");
                default:
                    return await db.todos.where({ list: list }).reverse().sortBy("lastEdit");
            }

        } catch (err) {
            console.log(err);
            return [];
        }
    }, [list])

    const listHeading = useLiveQuery(async () => {
        switch (list) {
            case -4:
                return "all";
            case -3:
                return "todo";
            case -2:
                return "done";
            case -1:
                return "starred";
        }

        return (await db.todoLists.where({ id: list }).first())?.name;
    }, [list]);

    const addTodo = (todo: string) => {
        try {
            db.todos.add({
                text: todo,
                completed: 0,
                starred: 0,
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
        <h1>{listHeading}</h1>
        <EnterTodo addTodo={addTodo} />
        {todos && todos.length > 0 ?
            <ul>{todos.map((todo) => (
                <Todo key={`todo-${todo.id}`} {...todo} />))}
            </ul> :
            <p>Looks like there's nothing here!</p>
        }

    </div >;
}

export default Todos;