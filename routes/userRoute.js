const route = require("express").Router();
const {
  handleLogin,
  handleRegister,
  getUserById,
  getToken,
  createToken,
} = require("../controllers/userController");

// route get user by id
route.post("/get", getUserById);
// route register
route.post("/register", handleRegister);
// route login user
route.post("/login", handleLogin);
// create new/update token
route.post("/create/token", createToken);
// get user token access
route.post("/get/token", getToken);

module.exports = route;
