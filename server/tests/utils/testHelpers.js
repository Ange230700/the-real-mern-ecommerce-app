const { request, app } = require("../config");

const registerAndLoginUser = async (userDetails, isAdmin = false) => {
  const user = {
    ...userDetails,
    is_admin: isAdmin,
  };

  const registrationResponse = await request(app)
    .post("/api/auth/register")
    .send(user);
  const { insertId } = registrationResponse.body;
  const credentials = {
    email: user.email,
    password: user.password,
  };

  const loginResponse = await request(app)
    .post("/api/auth/login")
    .send(credentials);
  const { token } = loginResponse.body;

  return { userId: insertId, token };
};

module.exports = registerAndLoginUser;
