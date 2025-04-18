const mongoose  = require("mongoose")
const Schema=mongoose.Schema

const entriesSchema=new Schema({
    title:{
        type:String,
        require:true
    },Delta:{
        type:Object,
        require:true
    },user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true})
module.exports=mongoose.model('Entries',entriesSchema)