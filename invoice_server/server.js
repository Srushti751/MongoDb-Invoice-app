const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/config.js')
const dotenv = require("dotenv");
const multer=require('multer');
const path=require('path');
const helpers = require('./helper')


// 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
//config dotenv
dotenv.config();

//connect database
connectDB();

const app = express()
app.set("view engine","ejs");

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

//route
app.get("/upload",(req,res)=>{
    res.render("upload")
})

app.use("/api",require('./routes/invoiceRoutes'))

app.use("/api/users",require('./routes/userRoutes'))

//for uploading 
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/')
    },
    filename:(req,file,cb)=>{
    //   cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
      cb(null,file.fieldname+path.extname(file.originalname))
    }
})
//end 

app.post("/fileupload",(req,res)=>{
    let upload=multer({storage:storage, fileFilter:helpers.imageFilter}).single('myfile');
 
    upload(req,res,(err)=>{
        if(req.fileValidationError){
            res.send(req.fileValidationError);
        }
       else if(!req.file){
           res.send("Please select a file");
       }
       else if(err){
           res.send("SOme uploading error");
       }
       else {
           res.end();
       }

    })

})



app.listen(8090,()=>{
    console.log("Working on http://localhost:8090")
})