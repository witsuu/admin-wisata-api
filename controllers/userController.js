const Users = require("../models/userSchema");
const {
  loginValidation,
  registerValidation,
} = require("../validation/userValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking Email Valid
  const email = await Users.findOne({
    email: req.body.email,
  });
  if (!email) return res.status(404).send("Email Salah!");

  //Checking Password valid
  const passwd = await bcrypt.compare(req.body.password, email.password);
  if (!passwd) return res.status(404).send("Password Salah!");

  //If Email and Pass Valid
  res.send(email._id);
};

const handleRegister = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check If Email Already Exist
  const emailExist = await Users.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).send("Email Sudah Ada");

  //Password Hashed
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  //Save New User
  const user = new Users({
    nama: req.body.nama,
    email: req.body.email,
    password: hashedPass,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUserById = async (req, res) => {
  const id = req.body.id;

  const dataUser = await Users.findById(id).select("nama email date");
  return res.send(dataUser);
};

const createToken = async (req, res) => {
  const id = req.body.id;
  const user = await Users.findById(id);

  if (user) {
    // create new token access
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_TOKEN_ACCESS
    );

    await Users.findByIdAndUpdate(id, { token_access: accessToken });

    return res.send(accessToken);
  } else {
    res.status(404).send("Cant create new token, user not found");
  }
};

const getToken = async (req, res) => {
  const id = req.body.id;
  const user = await Users.findById(id);

  if (user) {
    const accessToken = user.token_access;

    return res.send(accessToken);
  } else {
    return res.status(404).send("Token not found");
  }
};

module.exports = {
  handleLogin,
  handleRegister,
  getUserById,
  createToken,
  getToken,
};
