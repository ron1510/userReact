import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import "../index.css"

function AddPostComp({ userId, setAddPost, addNewPost }) {
    
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    return (
        <div className="">
            <h5 className="margin-bottom">New Post - User {userId}</h5>
            <div>
                <div className = "margin-bottom">
                    <span>Title: </span> <input onChange = {(e)=>{setTitle(e.target.value)}} type="text" /> <br /><br />
                    <span>Body: </span> <input onChange = {(e)=>{setBody(e.target.value)}} type="text" /> <br/>
                </div>
            </div>
            <div>
                <Button onClick={() => {setAddPost(false)}} className = "margin-right" variant="danger">Cancel</Button> 
                <Button className="margin-left" variant="warning" onClick={() => {
                    addNewPost(title, userId, body)
                    setAddPost(false)
                }}>Add</Button> 
            </div>
        </div>
    );
}

export default AddPostComp;