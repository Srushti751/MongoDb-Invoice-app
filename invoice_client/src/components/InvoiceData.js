import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { saveAs } from "file-saver";
import axios from "axios";
function InvoiceData({ invData }) {
  const [company, setCompany] = useState([]);
  const userData = JSON.parse(localStorage.getItem("currentUser"))
  const comp= userData.company
  // const [total, setTotal] = useState("")
  // useEffect(() => {
  //     setTotal(invData.map((inv)=>{return inv.prod}))

  // }, [])
  useEffect(() => {
    axios
      .get("/api/users/company")
      .then((response) => {
        const data = response.data;
        setCompany(data);
      })
      .catch((err) => {
        console.log("Fetch error", err);
      });
  }, []);

  const sendMail=()=>{
      axios.post("/api/sendmail")
  }
  const createAndDownloadPdf = (clientName, clientAddress, invNum, prod) => {
    const payload = {
      name: clientName,
      invNum: invNum,
      address: clientAddress,
      prod,
      comp
    };
    axios
      .post("/api/create-pdf", payload)
      .then(() => axios.get("/api/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
    console.log(payload);
  };
  return (
    <div>
      <Container>
        <Table striped bordered hover className="tableStyle mt-5">
          <thead className="productTable">
            <tr>
              <th>Invoice No.</th>
              <th>Client Name</th>
              <th>Client Address</th>
            </tr>
          </thead>
          <tbody>
            {invData.map((inv) => (
              <>
                <tr>
                  <td>{inv.invNum}</td>
                  <td>{inv.clientName}</td>
                  <td>{inv.clientAddress}</td>
                </tr>
                <h4 className="p-3">Products</h4>

                <tr>
                  <td colspan="3">
                    {inv.prod.map((prod) => {
                      return (
                        <>
                          <Container className="p-4">
                            <Table
                              striped
                              bordered
                              hover
                              className="productTable "
                            >
                              <tbody>
                                <tr>
                                  <th>{prod.prodName}</th>
                                  <td>{prod.qty}</td>
                                  <td>{prod.price}</td>
                                  <td>{prod.dis}</td>
                                  <th>Total: {prod.total}</th>
                                </tr>
                              </tbody>
                            </Table>
                          </Container>
                        </>
                      );
                    })}
                  </td>
                </tr>
                <Button variant="secondary" className="m-3"
                  onClick={() =>
                    createAndDownloadPdf(
                      inv.clientName,
                      inv.clientAddress,
                      inv.invNum,
                      inv.prod
                    )
                  }
                >
                  Download
                </Button>
                <Button  variant="secondary"
                  onClick={
                    sendMail
                  }
                >
                  Send to mail
                </Button>
              </>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* <div className="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr className="top">
            <td colspan="2">
              <table>
                <tr>
                  <td colspan="6" className="title">
                    <img
                      src="images/register.jpg"
                      style="width:100%; max-width:156px;"
                    />
                  </td>
                  <td>
                    <h1>Invoice</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr className="information">
            <td colspan="2">
              <table>
                {invData.map((inv) => (
                  <>
                    <tr>
                      <td>Customer name: {inv.clientName}</td>

                      <td>Invoice number:{inv.invNum}</td>
                    </tr>
                    <tr>
                      <td>Bill To:{inv.clientAddress}</td>
                    </tr>
                    <table>
                <tr>
                  <td>Customer name: ${inv.clientName}</td>

                  <td>Invoice number: ${inv.invNum}</td>
                </tr>
                <tr>
                  <td>Bill To: ${inv.clientAddress}</td>
                </tr>
              </table>
                    <table>
            <tr className="heading">
              <td>Items</td>
              <td>Qty</td>
              <td>Price</td>
              <td>Disc(%)</td>
              <td>Amount(Rs.)</td>
            </tr>
            $
            {inv.prod.map((prod) => {
              return (
                <tr className="item">
                  <td>${prod.prodName}</td>
                  <td>${prod.qty}</td>
                  <td>₹ ${prod.price}</td>
                  <td>${prod.dis}</td>
                  <td>${prod.total}</td>
                </tr>
              );
            })}
          </table>
        <br />

          <h1 className="justify-center">
          Total price: ₹ ${inv.prod.reduce((x, item) => x + item.total, 0)}
        </h1>
                  </>
                ))}
              </table>
             
            </td>
          </tr>
   
        </table>
      
      </div> */}
    </div>
  );
}

export default InvoiceData;
