import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import "../index.css"

function AddTodoComp({ userId, setAddTodo, addNewTodo }) {
    

    const [title, setTitle] = useState("")


    return (
        <div className="margin-bottom">
            <h5 className="margin-bottom">New Todo - User {userId}</h5>
            <div>
                <div className = "margin-bottom">
                    <span>Title: </span> <input type="text" onChange = {(e)=>{setTitle(e.target.value)}}/> <br/>
                </div>
            </div>
            <div>
                <Button onClick={() => {setAddTodo(false)}} className = "margin-right" variant="danger">Cancel</Button> 
                <Button className="margin-left" variant="warning" onClick={() => {
                    addNewTodo(title, userId)
                    setAddTodo(false)
                }}>Add</Button> 
            </div>
        </div>
    );
}

export default AddTodoComp;