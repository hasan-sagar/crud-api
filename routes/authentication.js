const router = require("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");

//user registration
router.post("/register", async (req, res) => {
  const addNewUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_PASS
    ).toString(),
  });
  try {
    const savedUser = await addNewUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    //checking username
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(500).json("Wrong Username");

    //checking password
    //password hashing in login from password
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC_PASS
    );
    //get real password
    const databasePassword = hashPassword.toString(CryptoJS.enc.Utf8);
    //user input password
    const userInputPassword = req.body.password;
    //checking password from db and input
    databasePassword !== userInputPassword &&
      res.status(500).json("Wrong Password");

    //successfull login
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
