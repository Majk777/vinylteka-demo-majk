const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, userName, password } = req.body;
  console.log("twój request do serwera");
  console.log(email, password, userName);

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    console.log("twój response do serwera");

    console.log({ user, token });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const user = await User.signup(email, password, userName);
    const token = createToken(user._id);
    // res.status(200).json({ email, user });
    res.status(200).json({ email, token, user: userName });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
