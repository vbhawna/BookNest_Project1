const express = require("express");
const { createOrder, getOrders } = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);

module.exports = orderRouter;