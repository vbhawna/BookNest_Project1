const Address = require("../models/address.models");

const createAddress = async(req, res, next) => {
    console.log("createAddress Controller Started executing");

    try {
        const addressData = req.body;

        const address = new Address(addressData);

        const savedAddress = await address.save();

        res.status(201).json({
            message: "Address Created Successfully.",
            address: savedAddress,
        });
    } catch (error) {
        next(error);
    }
};

const getAllAddresses = async (req, res, next) => {
    console.log("getAllAddresses Controller Started executing.");

    try {
        const allAddresses = await Address.find();

        res.status(200).json({
            message: "Fetched Addresses successfully.",
            addresses: allAddresses,
        });
    } catch(error) {
        console.error("Error Occurred while fetching all addresses: ", error);
        next(error);
    }
}   

const getAddressById = async (req, res, next) => {
    console.log("getAddressById controller Started executing.");

    try {
        const addressId = req.params.addressId;
        const address = await Address.findById(addressId);
        if(!address) {
            return res.status(404).json({
                message: "Address not found.",
            });
        } else {
            return res.status(200).json({
                message: "Address found successfully.",
                address: address,
            });
        }

    }catch(error) {
        console.log("Error occurred while fetching Address By Id: ", error);
        next(error);
    }
};


const updateAddress = async (req, res, next) => {
    try {
            const addressId = req.params.addressId;
            const updatedData = req.body;
            const updatedAddress = await Address.findByIdAndUpdate(addressId, updatedData, {returnDocument: 'after', runValidators: true});
            if(!updatedAddress) {
                return res.status(404).json({
                    message: "Address not found.",
                });
            }

            res.status(200).json({
                    message: "Address updated Successfully.",
                    address: updatedAddress,
            });
    } catch(error) {
        console.log("Error occurred while updating Address");
        next(error);
    }

}

const deleteAddress = async (req, res, next) => {
    try {
        const addressId = req.params.addressId;
        const deletedAddress = await Address.findByIdAndDelete(addressId);
        if(!deletedAddress) {
            return res.status(404).json({message: "Address not found."});
        }

        res.status(200).json({
                message: "Address deleted successfully.",
                address: deletedAddress,
        });
    } catch(error) {
        console.log("Error occured while deleting Address:", error);
        next(error);
    }
}

module.exports = { createAddress, getAllAddresses, getAddressById, updateAddress, deleteAddress };