import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import "../index.css"
import OtherDataComp from './OtherData';



function UserDetailsComp({ curUser, setSelectedId,updateUser,deleteUser, bColor}) {

    const [user, setUser] = useState(curUser)

    const [otherData, setOtherData] = useState(false)


    const setAddress = (newStreet, newCity, newZipcode) => {
        setUser({...user, address: {street: newStreet, city:newCity, zipcode:newZipcode}})
    }


    return (
        <div className={"margin-bottom "+ bColor.color}>
            <div>
                <span onClick={()=>{setSelectedId(user.id)}}>ID: </span>{user?.id}
                <br />
                <br />
                Name: <input type="text" value={user?.name} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} />
                <br />
                <br />
                Email: <input type="text" value={user?.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                <br />
            </div>
            <div className = "margin-top">
                <Button onMouseOver={() => { setOtherData(true) }} className="margin-right" variant="secondary">Other Data</Button>
                {Boolean(otherData) ? (<OtherDataComp address={user?.address} setAddress={setAddress} setOtherData={setOtherData} />): (null)}
                <>
                    <Button onClick = {()=>{updateUser(user)}} variant="success">Update</Button>
                    <Button onClick = {()=>{deleteUser(user)}} variant="danger">Delete</Button>
                </>
            </div>
        </div>
    );
}

export default UserDetailsComp;