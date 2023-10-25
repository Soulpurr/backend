const express = require("express");
const router = express.Router();
const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const verifyUser = require("../middleware/verifyUser");

require("dotenv").config();
router.post("/signUp", async (req, res) => {
  const { username, email, password,usertype } = req.body;
  let user = await User.findOne({ email });
  let success = false;
  try {
    if (!user) {
      var salt = bcrypt.genSaltSync(10);
      var securePass = bcrypt.hashSync(password, salt);
      user = await User.create({
        username:username,
        email:email,
        password:securePass,
        userType:usertype
        
      });
      var token = jwt.sign(
        {
          user: user,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "365d", // expires in 365 days
        }
      );
      success = true;
      return res.send({ token, success });
    }
    res.send({ message: "Already exists", success });
  } catch (error) {
    res.send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    let success = false;
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        var token = jwt.sign(
          {
            user: user,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "365d", // expires in 365 days
          }
        );
        success = true;
        return res.status(200).send({ token, success });
      }
    }
    res.send("No user exists");
  } catch (error) {
    res.status(404).send("Internal server error");
  }
});
router.get("/getUser", verifyUser, async (req, res) => {
  try {
    
  
  let user = await User.find({ _id: req.user._id });
  res.send(user);
} catch (error) {
    res.send({message:error})
}
});




module.exports = router;