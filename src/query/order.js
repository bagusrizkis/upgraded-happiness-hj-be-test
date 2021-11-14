const { Sequelize, Op } = require("sequelize");
const getLastXDays = require("../helpers/get-last-x-days");

class QueryOrder {
    constructor(models) {
        this.models = models;
        this.sequelize = models.sequelize;
        this.order = models.order;
        this.sequelize = models.sequelize;
    }

    /**
     * method @findAll
     * @param  {...any} any other sequelize option
     * @returns
     */
    findAll(...rest) {
        return this.order.findAll({
            attributes: {
                include: [
                    // ? In case want to match in requirement Table
                    // ["orderId", "Order ID"],
                    // ["createdAt", "Created At"],
                    // ["bookedAt", "Booked At"],
                    // ["amount", "Amount"],
                    // ["status", "Status"],
                    // ["broadcast", "Broadcast"],
                    // [Sequelize.literal("payment.name"), "Payment Method"],
                    // [Sequelize.literal("customer.name"), "Customer Name"],
                    // [Sequelize.literal("vendor.name"), "Vendor Name"],
                    // [Sequelize.literal("product.category"), "Product Category"],
                    [Sequelize.literal("payment.name"), "paymentMethod"],
                    [Sequelize.literal("customer.name"), "customerName"],
                    [Sequelize.literal("vendor.name"), "vendorName"],
                    [Sequelize.literal("product.category"), "productCategory"],
                ],
                exclude: [
                    // "orderId", "createdAt", "bookedAt", "amount", "status", "broadcast",
                ],
            },
            include: [
                { model: this.models.payment, attributes: ["name"] },
                { model: this.models.customer, attributes: ["name"] },
                { model: this.models.vendor, attributes: ["name"] },
                { model: this.models.product, attributes: ["category"] },
            ],
            ...rest,
        });
    }

    /**
     * method @count
     * @returns {number} number of all orders
     */
    count() {
        return this.order.count();
    }

    /**
     * method @countLastXDays
     * @param {object} {day: number}
     * @returns {number} number of counted order
     */
    countLastXDays({ day } = { day: 30 }) {
        const lastXDaysDate = getLastXDays(day);
        return this.order.count({
            where: { createdAt: { [Op.gt]: lastXDaysDate } },
        });
    }

    /**
     * method @countByPayment
     * @returns {Order[]} data grouped by paymentMethod
     */
    countByPayment() {
        return this.order.findAll({
            attributes: [
                "paymentId",
                [
                    this.sequelize.fn("COUNT", this.sequelize.col("paymentId")),
                    "count",
                ],
                [Sequelize.literal("payment.name"), "paymentMethod"],
            ],
            order: [["count", "DESC"]],
            group: ["paymentId", "payment.id"],
            include: [{ model: this.models.payment, attributes: ["name"] }],
        });
    }

    /**
     * method @countByStatus
     * @returns {array} data grouped by status ("Not Taken" | "Cancle" | "Expired" | "Complete")
     */
    countByStatus() {
        return this.order.findAll({
            attributes: [
                "status",
                [
                    this.sequelize.fn("COUNT", this.sequelize.col("status")),
                    "count",
                ],
            ],
            order: [["count", "DESC"]],
            group: ["status"],
        });
    }

    /**
     * method @countByCategory
     * @param optional {status: ("Not Taken" | "Cancle" | "Expired" | "Complete")}
     * @returns {array} data grouped by productId
     */
    countByCategory({ status } = { status: undefined }) {
        const opt = {};
        if (status) {
            opt.where = { status: status };
        }
        return this.order.findAll({
            attributes: [
                "productId",
                [
                    this.sequelize.fn("COUNT", this.sequelize.col("productId")),
                    "count",
                ],
                [Sequelize.literal("product.category"), "productCategory"],
            ],
            ...opt,
            order: [["count", "DESC"]],
            group: ["productId", "product.id"],
            include: [{ model: this.models.product, attributes: ["category"] }],
        });
    }
}

module.exports = QueryOrder;
