const jwt = require("jsonwebtoken");

const Authenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_TOKEN_ACCESS, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = {
  Authenticated,
};
