import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { Form, Button, Container, Col, Row, Table } from "react-bootstrap";
import { products } from "./products";
import axios from "axios";
function AddInvoice() {
  const invNum = Math.floor(Math.random() * 90000) + 10000;
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invDate, setInvDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [prod, setProd] = useState([]);
  const [prodName, setProdName] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [dis, setDis] = useState(0);
  const [status, setStatus] = useState(false);
  const [company, setCompany] = useState([]);
  const total=parseInt(price * qty - ((price * qty) / 100) * dis)

  const userState = useSelector(state=>state.loginUserReducer)
  const {currentUser} = userState
  const userData = JSON.parse(localStorage.getItem("currentUser"))

  const addProd = (e)=>{
      e.preventDefault()
    // setProd(
    //     prod.concat({
    //         prodName,qty,price,dis
    //     })
    //   );
    setProd([...prod,{prodName,qty,price,dis,total}])
    setProdName("")
        setQty(1)
        setPrice(0)
        setDis(0)
  }

  useEffect(() => {
     axios.get("/api/users/company")
        .then((response)=>{
          const data = response.data
          setCompany(data)
        })
        .catch((err)=>{
          console.log("Fetch error",err)
        })
  }, [])


  const submitForm = (e, invNum, clientName, clientAddress,invDate,dueDate, prod) => {
    e.preventDefault();

    const payload = {
      invNum: invNum,
      clientName: clientName,
      clientAddress,
      invDate,
      dueDate,
      prod,
      status,
      user:currentUser.name
    };

    axios({
      url: "/api/invoice",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("data is saved");
        alert("Invoice Added")
        setClientName("")
        setClientAddress("")
        setInvDate("")
        setDueDate("")
      })
      .catch((err) => {
        console.log("Internal error");
      });
  };

  // console.log(invNum,clientName,clientAddress,invDate)

  return (
    <div>
        {console.log(company)}
        
      <Container className="p-5 registerStyle ">

            <Form className="registerForm">
               
          <Form.Group className="mb-3">
            {/* <Form.Label>Invoice Number</Form.Label> */}
            {/* {company.map((comp)=><p>{(comp.company)}</p>)} */}
            <Form.Control type="hidden" name="inv_num" value={invNum} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text"  value={userData.company} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Client's Name</Form.Label>
            <Form.Control
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Client's Address </Form.Label>
            <Form.Control
              type="text"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              placeholder="Company Address"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Invoice Date </Form.Label>
            <Form.Control
              type="date"
              name="inv_date"
              value={invDate}
              onChange={(e) => setInvDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date </Form.Label>
            <Form.Control
              type="date"
              name="due_date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
          <h3>Products</h3>
          <Container>
            <Container>
                <Form>
              <Row>
                <Col xs>
                  <Form.Group className="mb-3">
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs>
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs>
                  <Form.Group className="mb-3">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="number"
                      value={dis}
                      onChange={(e) => setDis(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                      type="number"
                      value={total}
                    />
                  </Form.Group>
                </Col>

                <Button
                  variant="dark"
                  onClick={addProd}
                >
                  Add Product
                </Button>
              </Row>
              </Form>
            </Container>

            {/* <Form.Group className="mb-3">
            <Form.Label>Total </Form.Label>
            <Form.Control type="number" name="due_date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
          </Form.Group> */}
          </Container>
          <Button
          className="mt-3 "
                  variant="light"
                  onClick={(e) =>
                    submitForm(e, invNum, clientName, clientAddress,invDate,dueDate, prod)
                  }
                  type="submit"
                >
                  Save and Sumbit
                </Button>
        </Form>
        {/* <Table striped bordered hover>
          <thead>
            {products.map((prod) => (
              <tr>
                <th>{prod.item}</th>
                <th>{prod.qty}</th>
                <th>{prod.price}</th>
                <th>{prod.disc}</th>
              </tr>
            ))}
          </thead>
        </Table> */}
      </Container>
    </div>
  );
}

export default AddInvoice;
