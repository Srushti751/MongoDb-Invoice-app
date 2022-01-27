import React,{useState,useEffect} from 'react'
import {Button, Container} from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import { invoices } from './invoice'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import axios from 'axios'
import InvoiceData from './InvoiceData'
function Dashboard() {
    const [invoice, setInvoice] = useState([])
    const [invData, setInvData] = useState([])
    const [toggle, setToggle] = useState(false)
    const userData = JSON.parse(localStorage.getItem("currentUser"))
    const user= userData.name
 
    

    const getInvoice=()=>{
        axios.get(`/api/getinvoice/${user}`)
        .then((response)=>{
          const data = response.data
          setInvoice(data)
        })
        .catch((err)=>{
          console.log("Fetch error",err)
        })
    }

    const gotoInvoice=(id)=>{
        axios.get(`/api/invoicedata/${id}`)
        .then((response)=>{
            const data = response.data
            setInvData(data)
            setToggle(!toggle)
          })
          .catch((err)=>{
            console.log("Fetch error",err)
          })
    }
    useEffect(() => {
        getInvoice()
    }, [])

    return (
        <div>
            <Router>
                <Container className="p-5 invoiceStyle ">
                    <div className="flex-box">
                        <div  className="flex-boxCol">
                        <h1 className="">Invoices</h1>
                        <p>Total {invoice.length} invoices</p>

                        </div>
                        <a href="/addinvoice" className="btnStyle"> Add Invoice</a>
                    </div>
           
            <Table striped bordered hover className="tableStyle">
            <thead>
            <tr>
                        <th>Invoice Num</th>
                        <th>Due Date</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Status</th>
                        
                        </tr>
            </thead>
            <tbody>

                {invoice.map((inv)=>{
                    return(
                        <tr>
                        <td>{inv.invNum}</td>
                        <td>{inv.dueDate}</td>
                        <td>{inv.clientName}</td>
                        <td>₹ {inv.prod.reduce((x,item)=> x + item.total,0)}</td>
                        <td>{inv.status?<p>Paid</p>:<p>Pending</p>}</td>
                        <td><button onClick={()=>gotoInvoice(inv.invNum)} className="btn">Check</button></td>
                        
                        </tr>
                    )
                })}
               
            </tbody>

            </Table>
</Container>
        {toggle?
            <InvoiceData invData={invData}/>:""
        
    }
            </Router>
        </div>
    )
}

export default Dashboard
