const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

const authRouter = require("./auth/router");
const usersRouter = require("./users/router");
const cartsRouter = require("./carts/router");
const ordersRouter = require("./orders/router");
const productsRouter = require("./products/router");
const paymentRouter = require("./payment/router");

router.use("/items", itemsRouter);

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/carts", cartsRouter);
router.use("/orders", ordersRouter);
router.use("/products", productsRouter);
router.use("/payment", paymentRouter);

/* ************************************************************************* */

module.exports = router;
