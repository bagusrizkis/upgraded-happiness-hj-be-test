"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("orders", "orderId", {
            type: Sequelize.STRING,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("orders", "orderId");
    },
};
