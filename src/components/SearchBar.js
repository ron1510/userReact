import Button from 'react-bootstrap/Button';
import "../index.css"
import {useState, useEffect} from "react"

function SearchBarComp({ setSearchBarContent,setAddUser }) {
    
    const [searchBar, setSearchBar] = useState("")

    useEffect(() => {
        setSearchBarContent(searchBar)
    },[searchBar])

    return (
        <div className="margin-top">
            <span className = "margin-right">Search </span>
            <input onChange = {(e)=>{setSearchBar(e.target.value)}} type="text" className = "margin-right"/> 
            <Button onClick = {()=>{setAddUser(true)}} variant="success">Add</Button>
        </div>
    );
}

export default SearchBarComp;