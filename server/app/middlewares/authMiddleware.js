const jwt = require("jsonwebtoken");

const duration = 3 * 24 * 60 * 60;
const createToken = (user) =>
  jwt.sign(user, process.env.APP_SECRET, { expiresIn: duration });

const verifyToken = (request, response, next) => {
  // const authHeader = request.headers.token;
  const { token } = request.cookies;
  console.info("token ==>", token);

  if (token) {
    // const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.APP_SECRET, (err, user) => {
      if (err) {
        response.status(403).json({ message: "Token is not valid!" });
        next();
      } else {
        request.user = user;
        next();
      }
    });
  } else {
    response.status(400).json({ message: "You are not authenticated!" });
    next();
  }
};

const verifyTokenAndAuthorization = (request, response, next) => {
  verifyToken(request, response, () => {
    if (
      request.user.userId === Number(request.params.user_id) ||
      request.user.is_admin
    ) {
      next();
    } else {
      response.status(401).json({ message: "Unauthorized." });
    }
  });
};

const verifyTokenAndAdmin = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user.is_admin) {
      next();
    } else {
      response.status(401).json({ message: "You are not allowed to do that!" });
    }
  });
};

module.exports = {
  createToken,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
