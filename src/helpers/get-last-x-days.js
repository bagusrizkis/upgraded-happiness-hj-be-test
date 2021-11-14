const moment = require("moment");

module.exports = (numberOfDays = 30) => {
    return moment().subtract(numberOfDays, "days").format("YYYY-MM-DD");
};
