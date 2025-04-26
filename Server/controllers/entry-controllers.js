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

const getEntriesUser = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find all entries that belong to the current user
    const entries = await Entry.find({ user: userId });
    
    // Check if any entries exist
    if (entries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No entries found for this user",
      });
    }
    
    // Return all found entries
    res.status(200).json({
      success: true,
      message: 'Entries found',
      entries: entries
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving entries",
    });
  }
};

module.exports={
    createEntry,
    getEntriesUser
}
