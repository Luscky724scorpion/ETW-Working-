const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
  }

  //decode this token
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedTokenInfo);

     if (!decodedTokenInfo.id && !decodedTokenInfo._id) {
      console.log("No user ID found in token!");
      return res.status(401).json({
        success: false,
        message: "Invalid token. User ID missing.",
      });
    }
    req.user = decodedTokenInfo;;
    console.log('set req user',req.user)
    next();
  } catch (error) {
    console.log('verification error',error)
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
  }
}

module.exports = authMiddleware; 

