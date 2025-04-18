const Entry = require("../models/Entriesdb");

const createEntry = async (req, res) => {
  
  try {
    const { title, Delta } = req.body;
    const userId = req.user?.id || req.userInfo?.id || req.user?._id || req.userInfo?._id;
    if(!userId){
      return res.status(401).json({
        success:false,
        message:"not authenticated"
      })
    }
    const newEntry = new Entry({
      title,
      Delta,
      user:userId
    });
    await newEntry.save();
    if (newEntry) {
      res.status(201).json({
        success: true,
        message: "entry made successfully",
      });
    } 
    }
   catch (error) {
    console.log(error)({
      success: flase,
      message: "Error on entry",
    });
  }
};

//get entries for the user
const getEntriesUser = async (req, res) => {
  try {
    const entry = await Entry.find({user:req.user.id});

    //checking for entry
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }
    //who owns the entry
    if (entry.user.toString() !== req.user.id) {
      
    }
    else{(
        res.status(200).json({
            success:true,
            message:'present entry',
            entry:entry
        }))};
  } catch (error) {
    console.log(error)
      res.status(500)({
      success: flase,
      message: "Error on entry",
    });
  }
};
module.exports={
    createEntry,
    getEntriesUser
}
