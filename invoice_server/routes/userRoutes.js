const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel.js');
const jwtSecret="asd889asdas5656asdas887";
const nodemailer = require('nodemailer')
// const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter =nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'shettysrushti55555@gmail.com',
        pass:'Simple5#'
    }
})


router.post("/register",(req,res)=>{
    const {name,company,email,password} = req.body;

    const newblog = new userModel({name,company,email,password});
    newblog.save((error)=>{
        if(error){
            return((500),res.send("Something went wrong"))
        }
        res.send("Your data is saved in database!!!")

})
})
router.get("/company",(req,res)=>{

    userModel.find()
    .then((data)=>{
        console.log(data)
        res.json(data)

    })
    .catch((error)=>{
        console.log(error)
    })
})


router.put("/updateCompany",(req,res)=>{
    const {newname} = req.body;
    console.log("data", newname)
    // const newblog = new userModel(data);

    userModel.updateMany(
        {
            company:newname
        })
    .then((data)=>{
        console.log(data)
        res.json(data)

    })
    .catch((error)=>{
        console.log(error)
    })
})


router.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await userModel.find({email,password})
        if(user.length > 0){
           
            const currentUser={
                name:user[0].name,
                email:user[0].email,
                company:user[0].company,
                isAdmin:user[0].isAdmin,
                _id:user[0].Id,
            }
            res.status(200).send(currentUser)
        }
        else{
            res.status(400).json({
                message:"Login Failed"
            })
        }
    } catch (error) {
        res.send(error)
    }
})




module.exports = router