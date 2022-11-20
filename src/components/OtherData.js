import {useState, useEffect} from "react"


function OtherDataComp({address,setAddress, setOtherData}) {

    const [street, setStreet] = useState(address?.street)
    const [city, setCity] = useState(address?.city)
    const [zipcode, setZipcode] = useState(address?.zipcode)

    const handleClick = (e) => {
        if (e.target.name !== "zipCode" && e.target.name !== "city" && e.target.name !== "street") {
            setOtherData(false)
        }
    }

    return (
        <div className="App" name = "mainDiv" onClick={(e)=>{handleClick(e)}}>
            Street: <input name = "street" type="text" value={street} onChange={(e) => {
                setStreet(e.target.value)
                setAddress(street,city,zipcode)
            }} />
            <br />
            <br />
            City: <input name = "city" type="text" value={city} onChange={(e) => {
                setCity(e.target.value)
                setAddress(street,city,zipcode)
            }} />
            <br />
            <br />
            Zip Code: <input name = "zipCode" type="text" value={zipcode} onChange={(e) => {
                setZipcode(e.target.value)
                setAddress(street,city,zipcode)
            }} />
        </div>
    );
}

export default OtherDataComp;
