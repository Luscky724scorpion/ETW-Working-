const express = require("express");
const {
  registerUser,
  loginUser,test
  
} = require("../controllers/auth-controller");
const router = express.Router();
const cors=require('cors')
router.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))

const authMiddleware = require("../middlwares/auth-middleware");

//test-cors get test
router.get('/',test)


//all routes are related to authentication & authorization
router.post("/register", registerUser);
router.post("/login",loginUser);

module.exports=router
