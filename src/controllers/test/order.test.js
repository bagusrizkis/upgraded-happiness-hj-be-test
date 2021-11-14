const OrderController = require("../order");

const order = new OrderController(mockQuery());

describe(":: Order Controller ::", () => {
    describe("Method getAll", () => {
        it("Should success give a response and data", async () => {
            const res = mockResponse();
            await order.getAll({}, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                meta: {
                    message: "Success Get Order Data",
                    status: 200,
                    count: 2,
                },
                body: {
                    orders: [{ id: 1 }, { id: 2 }],
                },
            });
        });

        // TODO negative testcase
    });

    describe("Method orderReprt", () => {
        it("Should success give a response and data", async () => {
            const res = mockResponse();
            await order.orderReports({}, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                meta: {
                    message: "Success generate Dashboard Data",
                    status: 200,
                },
                body: {
                    board: {
                        last30Days: 30,
                        last7Days: 7,
                        totalOrderToday: 0,
                        orderByStatus: [{ status: "Complete", count: 2 }],
                        orderCompleteByCategory: [{ productId: 1, count: 1 }],
                        topCategoryOrder: [{ productId: 1, count: 2 }],
                        transactionByPaymentMethod: [
                            { paymentId: 1 },
                            { paymentId: 2 },
                        ],
                    },
                },
            });
        });

        // TODO negative testcase
    });
});

function mockResponse() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

function mockQuery() {
    return Object.create({
        findAll: () => {
            return new Promise((res, rej) => {
                res([{ id: 1 }, { id: 2 }]);
            });
        },
        countByPayment: () => {
            return new Promise((res, rej) => {
                res([{ paymentId: 1 }, { paymentId: 2 }]);
            });
        },
        countLastXDays: ({ day } = { day: 30 }) => {
            return new Promise((res, rej) => {
                res(day);
            });
        },
        countByStatus: () => {
            return new Promise((res, rej) => {
                res([{ status: "Complete", count: 2 }]);
            });
        },
        countByCategory: ({ status } = { status: undefined }) => {
            return new Promise((res, rej) => {
                if (status) {
                    if (status == "Complete") {
                        res([{ productId: 1, count: 1 }]);
                    } else if (
                        status !== "Cancel" ||
                        status !== "Not Taken" ||
                        status !== "Expired"
                    ) {
                        // TODO to change better error
                        rej("Error status tidak valid");
                    }
                } else {
                    res([{ productId: 1, count: 2 }]);
                }
            });
        },
    });
}
