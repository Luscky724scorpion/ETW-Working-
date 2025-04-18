const User = require("../models/userdb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test works");
};

const registerUser = async (req, res) => {
  try {
    //extract user info
    const { username, email, password, role } = req.body;

    //check if the user is already exists
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User  exists either with same username or same email. Please try with a different username or email",
      });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user and save in your database
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();

    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User registered successfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user! please try again.",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    //find if the current user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User doesn't exists`,
      });
    }
    //if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    //create user token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successful",
      token,
      user: {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};
/*const getUser = async (req, res) => {
  
  
  const user = await User.findOne({ username });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (error, userData) => {
      if (error) {
        console.error("JWT VERIFICATION ERROR");
      }
      res.json(userData);
    });
  } else {
    res.status(401).json({ message: "not authenticated" });
  }
};*/

module.exports = { registerUser, loginUser, test };
