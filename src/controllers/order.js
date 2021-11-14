const createResponse = require("../helpers/create-response");

class Order {
    constructor(query) {
        this.query = query;
    }

    async getAll(req, res) {
        try {
            const data = await this.query.findAll();
            return res.status(200).json(
                createResponse({
                    message: "Success Get Order Data",
                    status: 200,
                    count: data.length,
                    body: { orders: data },
                })
            );
        } catch (error) {
            // TODO create Centralized Error Handler
            console.error(error);
            return res.status(500).json(
                createResponse({
                    message: "Internal Server Error",
                    status: 500,
                    body: { devError: error },
                })
            );
        }
    }

    async orderReports(req, res) {
        try {
            const last30Days = await this.query.countLastXDays({
                day: 30,
            });
            const last7Days = await this.query.countLastXDays({ day: 7 });
            const totalOrderToday = await this.query.countLastXDays({ day: 0 });
            const orderByStatus = await this.query.countByStatus();
            const orderCompleteByCategory = await this.query.countByCategory({
                status: "Complete",
            });
            const topCategoryOrder = await this.query.countByCategory();
            const transactionByPaymentMethod =
                await this.query.countByPayment();
            return res.status(200).json(
                createResponse({
                    message: "Success generate Dashboard Data",
                    status: 200,
                    body: {
                        board: {
                            last30Days,
                            last7Days,
                            totalOrderToday,
                            orderByStatus,
                            orderCompleteByCategory,
                            topCategoryOrder,
                            transactionByPaymentMethod,
                        },
                    },
                })
            );
        } catch (error) {
            // TODO create Centralized Error Handler
            console.error(error);
            return res.status(500).json(
                createResponse({
                    message: "Internal Server Error",
                    status: 500,
                    body: { devError: error },
                })
            );
        }
    }
}

module.exports = Order;
