"use strict";

const paymentData = require(__dirname + "/../../../data/payment.json");
const vendorData = require(__dirname + "/../../../data/vendor.json");
const customerData = require(__dirname + "/../../../data/customer.json");
const productData = require(__dirname + "/../../../data/product.json");

const normalizeData = (item) => {
    item.createdAt = new Date();
    item.updatedAt = new Date();
    return item;
};

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const paymentDataNormalize = paymentData.map(normalizeData);
            await queryInterface.bulkInsert("payments", paymentDataNormalize);
            const vendorDataNormalized = vendorData.map(normalizeData);
            await queryInterface.bulkInsert("vendors", vendorDataNormalized);
            const customerDataNormalized = customerData.map(normalizeData);
            await queryInterface.bulkInsert(
                "customers",
                customerDataNormalized
            );
            const productDataNormalized = productData.map(normalizeData);
            await queryInterface.bulkInsert("products", productDataNormalized);
        } catch (error) {
            console.error(error);
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("payments", null, {});
    },
};
