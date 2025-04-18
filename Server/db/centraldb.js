const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("successfully connected to db"));
  } catch (error) {
    console.log(error);
    process.exit()
  }
};
module.exports=connectToDB