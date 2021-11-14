const { createServer } = require("http");
const { app } = require("./app");

const PORT = process.env.PORT || 3000;

(async () => {
    console.log("================================");
    createServer(app).listen(PORT, () => {
        console.info(` Server running on port :: ${PORT}`);
        console.log("================================");
    });
})();
