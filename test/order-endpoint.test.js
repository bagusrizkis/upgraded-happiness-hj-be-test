const request = require("supertest");
const getLastXDays = require("../src/helpers/get-last-x-days");
const { app } = require("../src/app");
const { sequelize } = require("../src/models");

const { queryInterface } = sequelize;

const date3DaysAgo = getLastXDays(3);
const date15DaysAgo = getLastXDays(15);

const orderData = [
    {
        id: 1,
        amount: 246032,
        bookedAt: date3DaysAgo,
        status: "Complete",
        broadcast: 7,
        createdAt: date3DaysAgo,
        updatedAt: date3DaysAgo,
        vendorId: 1,
        customerId: 1,
        paymentId: 1,
        productId: 1,
        orderId: "SA7EUX18141021",
    },
    {
        id: 2,
        amount: 246032,
        bookedAt: date15DaysAgo,
        status: "Cancel",
        broadcast: 7,
        createdAt: date15DaysAgo,
        updatedAt: date15DaysAgo,
        vendorId: 1,
        customerId: 1,
        paymentId: 1,
        productId: 1,
        orderId: "SA7EUX18141021",
    },
    {
        id: 3,
        amount: 246032,
        bookedAt: new Date(),
        status: "Complete",
        broadcast: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        vendorId: null,
        customerId: 1,
        paymentId: 1,
        productId: 2,
        orderId: "SA7EUX18141021",
    },
];

describe(":: Order Endpoint ::", () => {
    beforeAll(async () => {
        await queryInterface.bulkDelete("orders", null, {});
        await queryInterface.bulkDelete("customers", null, {});
        await queryInterface.bulkDelete("products", null, {});
        await queryInterface.bulkDelete("vendors", null, {});
        await queryInterface.bulkDelete("payments", null, {});

        await queryInterface.bulkInsert("customers", [
            {
                id: 1,
                name: "Ponco Tester",
                createdAt: "2021-10-21T10:54:38.174Z",
                updatedAt: "2021-10-21T10:54:38.174Z",
            },
        ]);
        await queryInterface.bulkInsert("products", [
            {
                id: 1,
                category: "Office Cleaning",
                createdAt: "2021-10-21T10:54:38.174Z",
                updatedAt: "2021-10-21T10:54:38.174Z",
            },
            {
                id: 2,
                category: "Paket Apartemen / Kost",
                createdAt: "2021-10-21T10:54:38.174Z",
                updatedAt: "2021-10-21T10:54:38.174Z",
            },
        ]);
        await queryInterface.bulkInsert("vendors", [
            {
                id: 1,
                name: "dwi ponco vendor",
                createdAt: "2021-10-21T10:54:38.174Z",
                updatedAt: "2021-10-21T10:54:38.174Z",
            },
        ]);
        await queryInterface.bulkInsert("payments", [
            {
                id: 1,
                name: "Tunai",
                createdAt: "2021-10-21T10:54:38.174Z",
                updatedAt: "2021-10-21T10:54:38.174Z",
            },
        ]);
        await queryInterface.bulkInsert("orders", orderData);
    });

    afterAll(async () => {
        await queryInterface.bulkDelete("orders", null, {});
        await queryInterface.bulkDelete("customers", null, {});
        await queryInterface.bulkDelete("products", null, {});
        await queryInterface.bulkDelete("vendors", null, {});
        await queryInterface.bulkDelete("payments", null, {});
    });

    it("GET /v1/ endpoint should work correctly", async () => {
        const response = await request(app).get("/v1/");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("meta");
        expect(response.body).toHaveProperty("body");
    });

    it("GET /v1/orders/ Success get data orders", async () => {
        const response = await request(app).get("/v1/orders/");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("meta");
        expect(response.body).toHaveProperty("body");

        expect(response.body.meta).toEqual({
            count: 3,
            message: "Success Get Order Data",
            status: 200,
        });
        expect(response.body.body).toHaveProperty("orders");
        expect(response.body.body.orders[0]).toEqual({
            id: 1,
            amount: 246032,
            bookedAt: "2021-11-11T00:00:00.000Z",
            status: "Complete",
            broadcast: 7,
            orderId: "SA7EUX18141021",
            vendorId: 1,
            customerId: 1,
            paymentId: 1,
            productId: 1,
            createdAt: "2021-11-11T00:00:00.000Z",
            updatedAt: "2021-11-11T00:00:00.000Z",
            paymentMethod: "Tunai",
            customerName: "Ponco Tester",
            vendorName: "dwi ponco vendor",
            productCategory: "Office Cleaning",
            payment: { name: "Tunai" },
            customer: { name: "Ponco Tester" },
            vendor: { name: "dwi ponco vendor" },
            product: { category: "Office Cleaning" },
        });
    });

    it("GET /v1/orders-dashboard/ Success get dashboard data", async () => {
        const response = await request(app).get("/v1/orders-dashboard/");

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty("meta");
        expect(response.body.meta).toEqual({
            status: 200,
            message: "Success generate Dashboard Data",
        });

        expect(response.body).toHaveProperty("body");
        expect(response.body.body.board).toHaveProperty("last30Days");
        expect(response.body.body.board).toHaveProperty("last7Days");
        expect(response.body.body.board).toHaveProperty("totalOrderToday");
        expect(response.body.body.board).toHaveProperty("orderByStatus");
        expect(response.body.body.board).toHaveProperty(
            "orderCompleteByCategory"
        );
        expect(response.body.body.board).toHaveProperty("topCategoryOrder");
        expect(response.body.body.board).toHaveProperty(
            "transactionByPaymentMethod"
        );
    });
});
