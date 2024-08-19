const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.statics.signup = async function (email, password, userName) {
  if (!email || !password || !userName) {
    throw Error("Uzupełnij wszystkie pola");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email) {
    emailPattern.test(email)
      ? console.log(`email is true: ${email}`)
      : console.log(`email is false: ${email}`);
  }

  if (email) {
    if (!emailPattern.test(email)) {
      throw new Error("Email is not valid");
    }
  }
  const emailExists = await this.findOne({ email });
  const userExists = await this.findOne({ userName });

  if (emailExists) {
    throw Error("Email already in use" + emailExists);
  }

  if (userExists) {
    throw Error("user name already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, userName });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Uzupełnij wszystkie pola");
  }

  console.log("login ze static login w modelu");
  console.log(email, password);
  // const user = { email, password };
  const user = await this.findOne({ email });
  // console.log(emailExists);
  // const user = emailExists;
  const loginPassword = user.password;

  console.log("to jest user return");
  console.log(user);
  const { userName } = user;
  console.log("username to");
  console.log(userName);

  const compared = await bcrypt.compare(password, loginPassword);
  console.log(compared);
  if (!compared) {
    throw Error("nieprawidłowe hasło");
  }

  return userName;
};

module.exports = mongoose.model("User", userSchema);
