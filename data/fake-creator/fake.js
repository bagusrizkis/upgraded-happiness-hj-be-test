var fs = require("fs");
const faker = require("faker");
const generateOrderId = require("../../src/helpers/generate-order-id");

const data = [];
for (let i = 0; i < 100; i++) {
    const dateBooked = faker.date.between("10-01-2021", "11-14-2021");
    data.push({
        amount: +faker.finance.amount(50000, 400000, 0),
        bookedAt: dateBooked,
        status: faker.random.arrayElement([
            "Complete",
            "Cancel",
            "Expired",
            "Not taken",
        ]),
        broadcast: faker.datatype.number({ min: 0, max: 10, precision: 1 }),
        createdAt: dateBooked,
        updatedAt: dateBooked,
        vendorId: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        customerId: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        paymentId: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        productId: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        orderId: generateOrderId(),
    });
}

// console.log(JSON.stringify(data, null, 4));
fs.writeFile(
    __dirname + "/../fake-order.json",
    JSON.stringify(data),
    "utf8",
    (error) => {
        if (error) throw err;
        console.log("complete");
    }
);
