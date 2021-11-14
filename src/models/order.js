"use strict";
const generateOrderId = require("../helpers/generate-order-id");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            order.belongsTo(models.customer);
            order.belongsTo(models.vendor);
            order.belongsTo(models.product);
            order.belongsTo(models.payment);
        }
    }
    order.init(
        {
            amount: DataTypes.NUMBER,
            bookedAt: DataTypes.DATE,
            status: DataTypes.ENUM(
                "Complete",
                "Cancel",
                "Expired",
                "Not taken"
            ),
            broadcast: DataTypes.NUMBER,
            orderId: {
                type: DataTypes.STRING,
            },
            vendorId: DataTypes.NUMBER,
            customerId: DataTypes.NUMBER,
            paymentId: DataTypes.NUMBER,
            productId: DataTypes.NUMBER,
        },
        {
            sequelize,
            modelName: "order",
            hooks: {
                beforeCreate: (instance, options) => {
                    instance.orderId = generateOrderId();
                },
            },
        }
    );
    return order;
};
