const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const nodeMailer = require("../middlewares/nodeMailer");

// @Desc register the user
// @route /register
// @access public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("All fields are mandatory to be filled!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400)
    throw new Error("User already exists!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  console.log(user);
  console.log(hashedPassword);
  res.json(user)
  // nodeMailer(req, res);
});

// @Desc login user
// @route /users/login
// @access public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400)
    throw new Error("All fields are mandatory to be filled!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400)
    throw new Error("Invalid Input");
  }
});

// @Desc get the current user's info
// @route /users/currentInfo
// @access private
const currentInfo = expressAsyncHandler(async (req, res) => {
  res.json(req.user)
});

module.exports = { registerUser, loginUser, currentInfo };
