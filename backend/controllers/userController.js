const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, userName, password } = req.body;
  console.log("twój request do serwera");
  console.log(email, password, userName);

  // res.json({ mssg: "login" });
  // console.log("loginUser working");
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    // console.log("user is" + user);
    // res.status(200).json({ email, password, user });
    // tu mamy do ogarnięcia co się zwraca, bo nam zwraca cały obiekt chyba i się robi incepcja

    // res.status(200).json({ email, userName, token });
    console.log("twój response do serwera");
    // console.log({ email, userName, token });
    // res.status(200).json({ email, userName, token });
    console.log({ user, token });
    res.status(200).json({ user, token });
  } catch (error) {
    // console.log(error.message);

    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  // const checkreq = req.body;
  // const { email, password, userName } = req.body;
  // res.json({ mssg: "signup" });
  // console.log("signupUser working");
  // console.log(checkreq);
  // console.log(email, password, userName);
  // await User.checkRequest(email, password, userName);
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
