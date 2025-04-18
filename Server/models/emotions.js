const mongoose=require('mongoose')
const Schema=mongoose.Schema


const feelingsSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
     feelings: {
        type: Map,
        of: Number,
        default: {
          anger: 0,
          fear: 0,
          disgust: 0,
          happy: 0,
          sad: 0,
          surprise: 0
        }}},{timestamps:true})

module.exports=mongoose.model('feelings',feelingsSchema)