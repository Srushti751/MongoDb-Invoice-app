import axios from 'axios'
import React, { useEffect } from 'react'
import Updateinfo from './Updateinfo'
import {Form,Button,Container} from 'react-bootstrap'


function Upload() {

    return (
        <div>
              <Container className="p-5 invoiceStyle ">

            <form method="post" action="/fileupload" enctype="multipart/form-data">
                <p>Update Logo</p>
                <input type="file" name="myfile"/><br/>
                <input className="btnStyle mt-3" type="submit" value="Update logo"/>
            </form>

            <Updateinfo/>
            </Container>
        </div>
    )
}

export default Upload
