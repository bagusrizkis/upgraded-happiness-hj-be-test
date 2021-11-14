"use strict";
const orderData = require(__dirname + "/../../../data/fake-order.json");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("orders", orderData);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("orders", null, {});
    },
};
