const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    invNum:{
        type:Number,
    },
    clientName:{
        type:String,
    },
    clientAddress:{
        type:String,
    },
    invDate:{
        type:String,
    },
    dueDate:{
        type:String,
    },
    prod:{
        type:Array,
    },
    status:{
        type:Boolean
    },
    user:String
    
},{timestamps:true})

const invoiceModel = mongoose.model('invoice',invoiceSchema)

module.exports = invoiceModel;