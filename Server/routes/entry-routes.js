const express = require("express");
const {
  createEntry,
  getEntriesUser,
} = require("../controllers/entry-controllers");
const sanitizeDelta = require("../middlwares/SanitizeDelta");
const {check}=require("express-validator");
const validate  = require("../middlwares/validator");
const router = express.Router();
const authMiddleware=require('../middlwares/auth-middleware')

router.use(express.json())

//using cors middleware  here
const cors=require('cors')
router.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))
//routes related to posting new entries and getting the entries

router.post(
  "/",authMiddleware,
  [
    check("title", "Title is required").not().isEmpty(),
    check("Delta", "Delta content is required").not().isEmpty(),
  ],validate,
  sanitizeDelta,
  createEntry
);
//get my posts router
router.get("/display",authMiddleware, getEntriesUser);

module.exports = router;
