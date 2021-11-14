"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("orders", "vendorId", {
            type: Sequelize.INTEGER,
            references: {
                model: "vendors",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
        await queryInterface.addColumn("orders", "customerId", {
            type: Sequelize.INTEGER,
            references: {
                model: "customers",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
        await queryInterface.addColumn("orders", "paymentId", {
            type: Sequelize.INTEGER,
            references: {
                model: "payments",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
        await queryInterface.addColumn("orders", "productId", {
            type: Sequelize.INTEGER,
            references: {
                model: "products",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("orders", "vendorId");
        await queryInterface.removeColumn("orders", "customerId");
        await queryInterface.removeColumn("orders", "paymentId");
        await queryInterface.removeColumn("orders", "productId");
    },
};
