"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            amount: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            bookedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            status: {
                type: Sequelize.ENUM(
                    "Complete",
                    "Cancel",
                    "Expired",
                    "Not taken"
                ),
            },
            broadcast: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("orders");
    },
};
