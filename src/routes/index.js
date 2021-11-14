const router = require("express").Router();
const createResponse = require("../helpers/create-response");
const QueryOrder = require("../query/order");
const OrderController = require("../controllers/order");
const model = require("../models");

const queryOrder = new QueryOrder(model);
const orderController = new OrderController(queryOrder);

// Order
router.get("/orders", orderController.getAll.bind(orderController));
router.get(
    "/orders-dashboard",
    orderController.orderReports.bind(orderController)
);

// Testing root endpoint
router.get("/", (req, res) => {
    res.status(200).json(
        createResponse({
            status: 200,
            message: "Backend Code for Test",
            body: {
                req: req.headers,
                now: new Date(),
            },
        })
    );
});

module.exports = router;
