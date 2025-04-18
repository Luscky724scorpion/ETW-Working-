
const feelingsSchema = require("../models/emotions");


const logFeelings = async (req, res) => {
  try {
    // Get feelings from the URL parameter or request body
    const feelings = req.params.feelings || req.body.feelings;
    
    if (!feelings) {
      return res.status(400).json({
        success: false,
        message: "Feelings parameter is required",
      });
    }
    
    // Get user ID from the auth middleware
    const userId = req.user.id || req.user._id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in auth token",
      });
    }
    
    const updated = await feelingsSchema.findOneAndUpdate(
      { user: userId },
      { $inc: { [`feelings.${feelings}`]: 1 } },
      { new: true, upsert: true }
    );
    
    return res.status(200).json({
      success: true,
      message: "Feelings updated successfully",
      data: updated
    });
    
  } catch (error) {
    console.error("Error logging feelings:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while logging feelings",
      error: error.message
    });
  }
};
const feelingCount=async(req,res) =>{
    try {
        const getCount=await feelingsSchema.findOne({user:req.user.id ||req.user._id
        })
        res.json(getCount?getCount:{})
    }catch(error){
        res.status(500).json({
            message:'cant get feeling Count'
        }
        )
    }
    
}
module.exports={logFeelings,feelingCount}

