import React,{useState} from 'react'
import {Form, Button, Container ,Row,Col} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import {registerUser} from '../actions/userAction'
import NavBar from './NavBar';

function Signup() {
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    

    const dispatch = useDispatch()

    const registerHandler=(e)=>{
        e.preventDefault()
        if(password !== confirm){
            alert("Password dont match")
        }else{
            const user = {name,company,email,phone,password}
            dispatch(registerUser(user))
            console.log(user)
        }
    }
    
    return (
        <div>
  <Row>
    <Col md={6}>
        <img src="images/signup.jpg" width="100%" height="100%"/>
    </Col>
    <Col className="bg-light">
    <Container className="p-5 registerStyle ">
    <h2 className="mt-2  ">Register</h2>

            <Form className="registerForm">
            <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)}placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" value={company} onChange={(e)=>setCompany(e.target.value)}placeholder="Comapny name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter phone" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Confirm</Form.Label>
                    <Form.Control type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Password" />
                </Form.Group>
               
                <Button variant="primary" onClick={registerHandler} type="submit">
                    Submit
                </Button>
            </Form>
            </Container>
    </Col>
  </Row>
 
               
        </div>
    )
}

export default Signup

