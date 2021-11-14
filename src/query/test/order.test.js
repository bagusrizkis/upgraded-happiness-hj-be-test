const getLastXDays = require("../../helpers/get-last-x-days");
const models = require("../../models");
const QueryOrder = require("../order");
const queryOrder = new QueryOrder(models);

const { queryInterface } = models.sequelize;

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

describe(":: Order Query ::", () => {
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

    it("Should return all data", async () => {
        const result = await queryOrder.findAll();
        expect(result.length).toBe(3);
        expect(result).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: 1 })])
        );
        expect(result).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: 2 })])
        );
        expect(result).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: 3 })])
        );
    });

    it("Correctly Count Last 30 Days Order", async () => {
        const result = await queryOrder.countLastXDays({ day: 30 });
        expect(result).toBe(3);
    });

    it("Correctly Count Last 7 Days Order", async () => {
        const result = await queryOrder.countLastXDays({ day: 7 });
        expect(result).toBe(2);
    });

    it("Correctly Count Today Order", async () => {
        const result = await queryOrder.countLastXDays({ day: 0 });
        expect(result).toBe(1);
    });

    it("Correctly Count Order By Payment Method", async () => {
        const result = JSON.stringify(await queryOrder.countByPayment());
        expect(JSON.parse(result)).toEqual([
            {
                count: "3",
                payment: { name: "Tunai" },
                paymentId: 1,
                paymentMethod: "Tunai",
            },
        ]);
    });

    it("Correctly Count Order By Status", async () => {
        const result = JSON.stringify(await queryOrder.countByStatus());
        expect(JSON.parse(result)).toEqual([
            { status: "Complete", count: "2" },
            { status: "Cancel", count: "1" },
        ]);
    });

    it("Correctly Count Order By Category", async () => {
        const result = JSON.stringify(await queryOrder.countByCategory());
        expect(JSON.parse(result)).toEqual([
            {
                productId: 1,
                count: "2",
                productCategory: "Office Cleaning",
                product: { category: "Office Cleaning" },
            },
            {
                productId: 2,
                count: "1",
                productCategory: "Paket Apartemen / Kost",
                product: { category: "Paket Apartemen / Kost" },
            },
        ]);
    });

    it("Correctly Count Completed Order By Category", async () => {
        const result = JSON.stringify(
            await queryOrder.countByCategory({ status: "Complete" })
        );
        expect(JSON.parse(result)).toEqual([
            {
                productId: 1,
                count: "1",
                productCategory: "Office Cleaning",
                product: { category: "Office Cleaning" },
            },
            {
                productId: 2,
                count: "1",
                productCategory: "Paket Apartemen / Kost",
                product: { category: "Paket Apartemen / Kost" },
            },
        ]);
    });
});
