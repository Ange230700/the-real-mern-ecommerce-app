const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");
const authRouter = require("./auth/router");
const usersRouter = require("./users/router");
const cartsRouter = require("./carts/router");

router.use("/items", itemsRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/carts", cartsRouter);

/* ************************************************************************* */

module.exports = router;
