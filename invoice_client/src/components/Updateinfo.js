import axios from 'axios'
import React, { useState } from 'react'
import {Form,Button,Container} from 'react-bootstrap'

function Updateinfo() {
    const [newname, setNewname] = useState("")
    const updateInfo=()=>{
        const company = {newname}
        const data = JSON.parse(localStorage.getItem("currentUser"))
                data.company = newname           
            localStorage.setItem('currentUser',JSON.stringify(data))
        axios.put("/api/users/updateCompany",company)
        alert("Company Name updated")
        setNewname("")
    }
    return (
        <div>
            <Form>

              <Form.Group className="mb-3" >
                    <Form.Label>Company name</Form.Label>
                    <Form.Control type="text" value={newname} onChange={(e)=>setNewname(e.target.value)}  />
                </Form.Group>
               
                <Button  className="btnStyle " variant="primary" onClick={updateInfo} >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Updateinfo
