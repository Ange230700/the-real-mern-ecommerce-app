const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
  const authHeader = request.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.APP_SECRET, (err, user) => {
      if (err) {
        response.status(403).json({ message: "Token is not valid!" });
      }

      request.user = user;
      next();
    });
  } else {
    response.status(400).json({ message: "You are not authenticated!" });
  }
};

const verifyTokenAndAuthorization = (request, response, next) => {
  verifyToken(request, response, () => {
    console.info(request.params);
    if (
      request.user.id === Number(request.params.id) ||
      request.user.is_admin
    ) {
      next();
    } else {
      response.status(401).json({ message: "Unauthorized" });
    }
  });
};

const verifyTokenAndAdmin = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user.is_admin) {
      next();
    } else {
      response.status(403).json({ message: "You are not allowed to do that!" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
