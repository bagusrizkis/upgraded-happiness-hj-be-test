const createResponse = require("../create-response");
const generateOrderId = require("../generate-order-id");

describe(":: Helpers Test ::", () => {
    describe("create-response", () => {
        it("create-response Should return corect value", () => {
            const response = createResponse({
                message: "This shoul be a message in meta",
                status: 200,
                body: {
                    data: "this is should in body",
                },
            });
            expect(response).toEqual({
                meta: {
                    message: "This shoul be a message in meta",
                    status: 200,
                },
                body: {
                    data: "this is should in body",
                },
            });
        });
    });

    describe("generate-order-id", () => {
        it("Should generate OrderId", () => {
            let orderId = generateOrderId();
            expect(orderId.length).toBe(14);

            const date = new Date();
            let hour = String(date.getHours());
            orderId = orderId.slice(6);

            expect(orderId[0] + orderId[1]).toBe(
                hour.length == 1 ? 0 + hour : hour
            );
            expect(orderId[2] + orderId[3]).toBe(String(date.getDate()));
            expect(orderId[4] + orderId[5]).toBe(String(date.getMonth()));
            expect(orderId[6] + orderId[7]).toBe(
                String(date.getFullYear()).slice(2)
            );
        });
    });
});
