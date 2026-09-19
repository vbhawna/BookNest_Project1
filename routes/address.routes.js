const { createAddress, getAllAddresses, getAddressById, updateAddress, deleteAddress } = require("../controllers/address.controller");
const express = require("express");
const addressRouter = express.Router();

addressRouter.post("/", createAddress);
addressRouter.get("/", getAllAddresses);
addressRouter.get("/:addressId", getAddressById);
addressRouter.put("/:addressId", updateAddress);
addressRouter.delete("/:addressId", deleteAddress);

module.exports = addressRouter;