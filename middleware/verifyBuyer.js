var jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyBuyer = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.send("Invalid access");
    }
    console.log(token);
    const data =jwt.verify(token, process.env.JWT_SECRET);
    if(data.user.userType!='buyer'){
      return res.send("Not a buyer")

    }
    req.user = data.user;
    next();
    
    
  } catch (error) {
    res.send("User Verification failed");
  }
};
module.exports = verifyBuyer;