const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./users/router");
const itemsRouter = require("./items/router");

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

/* ************************************************************************* */

module.exports = router;
