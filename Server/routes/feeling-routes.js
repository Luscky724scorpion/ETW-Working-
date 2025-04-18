const express=require('express')

const{logFeelings,feelingCount}=require("../controllers/feelings-controllers")
const router=express.Router()
const authMiddleware=require('../middlwares/auth-middleware')
const cors=require('cors')


router.use(express.json())
router.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))


//will help me get the feelinfs I need 
router.post('/log-feels',authMiddleware,logFeelings)

//will help fetch feelings for graph
router.get('/catch-feels',authMiddleware,feelingCount)

module.exports=router