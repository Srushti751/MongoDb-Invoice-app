const express = require('express')
const router = express.Router()
const invoiceModel = require('../models/invoiceModel.js')

const pdf = require('html-pdf');
const pdfTemplate = require('../documents/index.js');

router.post("/invoice",(req,res)=>{
    console.log("Body:",req.body)
    const data = req.body;

    const newblog = new invoiceModel(data);
    newblog.save((error)=>{
        if(error){
            return((500),res.send("Something went wrong"))
        }
        res.send("Your data is saved in database!!!")
})
})

router.get("/getinvoice/:name",(req,res)=>{
    let user = req.params.name;


    invoiceModel.find({user:user})
    .then((data)=>{
        console.log(data)
        res.json(data)

    })
    .catch((error)=>{
        console.log(error)
    })
})

const nodemailer = require('nodemailer')

const transporter =nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth:{
        user:'shettysrushti55555@gmail.com',
        pass:'Simple5#'
    }
})

router.post("/sendmail",(req,res)=>{
    console.log("Body:",req.body)
    const data = req.body;
    let maildetails = {
        to:"shettysrushti55555@gmail.com",
        from:"florence.barrows41@ethereal.email",
        subject:" Invoice file",
        text:  `Hi,  Your Invoice data is sent `,
        attachments:[{filename:"invoice.pdf",path:'../invoice_server/result.pdf'}]

    }

    transporter.sendMail(maildetails,(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("Email sent")
            }
        })
 
 
})

router.delete("/delete/:id",(req,res)=>{
    let id = req.params.id;
    orderModel.deleteOne({_id:id},(err)=>{
        if(err) throw err
        res.send("Category deleted")
    })
})
router.get("/invoicedata/:id",(req,res)=>{
    let id = req.params.id;

    invoiceModel.find({invNum:id})
    .then((data)=>{
        console.log(data)
        res.json(data)

    })
    .catch((error)=>{
        console.log(error)
    })
})


router.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

router.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

module.exports = router