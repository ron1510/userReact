import Button from 'react-bootstrap/Button';
import '../index.css'
import { updateItem } from "../utils"


function TodoComp({ todo, setTodos, todos }) {
    

    const completedTodo = () => {
        todo.completed = true
        setTodos(updateItem(todos,todo))
    }

    return (
        <div className="black-border margin-top">
            Title: {todo.title} <br/>
            Completed: {String(todo.completed)} {!Boolean(todo.completed)?(<Button onClick = {()=>{completedTodo()}}>Mark Completed</Button>) :(null)}
        </div>
    );
}

export default TodoComp;
