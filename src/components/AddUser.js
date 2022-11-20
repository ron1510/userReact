import Button from 'react-bootstrap/Button';
import "../index.css"
import {useState} from 'react'

function AddUserComp({ setAddUser, addNewUser }) {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="">
            <h5 className = "margin-bottom">Add New User:</h5>
            <div>
                <div className = "margin-bottom">
                    <span>Name:</span> <input type="text" onChange={(e)=>{setName(e.target.value)}} /> <br/>
                </div>
                <div className = "margin-bottom">
                    <span>Email:</span> <input type = "text" onChange={(e)=>{setEmail(e.target.value)}}/> <br/>
                </div>
            </div>
            <div>
                <Button onClick={() => { setAddUser(false)}} className = "margin-right" variant="danger">Cancel</Button> 
                <Button className="margin-left" variant="success" onClick={() => {
                    addNewUser(name, email)
                    setAddUser(false)
                }}>Add</Button> 
            </div>
        </div>
    );
}

export default AddUserComp;