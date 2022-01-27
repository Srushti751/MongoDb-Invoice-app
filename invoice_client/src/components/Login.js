import React,{useEffect, useState} from 'react'
import {Form, Button, Container } from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import {loginUser} from '../actions/userAction'
import NavBar from './NavBar';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
       if(localStorage.getItem("currentUser")){
           window.location.href="/"
       }
    }, [])

    const loginHandler=(e)=>{
            
            const user = {email,password}
            dispatch(loginUser(user))
            setEmail("")
            setPassword("")
    }
    
    return (
        <div>
            <Container  className="p-5 registerStyle  " >
                <h1>Login</h1>
            <Form className="registerForm">
            
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
               
               
                <Button variant="primary" onClick={loginHandler} >
                    Submit
                </Button>
            </Form>
            </Container>
        </div>
    )
}

export default Login

