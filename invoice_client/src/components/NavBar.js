import React, { useEffect, useState } from 'react'
import { Navbar,Nav,Container } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import {logoutUser} from '../actions/userAction'
function NavBar() {
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    const userState = useSelector(state=>state.loginUserReducer)
    const {currentUser} = userState
    return (
        <div>
              <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Invoice App</Navbar.Brand>
                <Nav className="me-auto">
                {currentUser ? (<>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/upload">Settings</Nav.Link>
                <Nav.Link href="/" className="" onClick={()=>{dispatch(logoutUser())}}>Logout</Nav.Link>

                    </>):
                        <>

             
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                </>}

                </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar
