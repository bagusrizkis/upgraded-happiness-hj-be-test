const randomstring = require("randomstring");

module.exports = () => {
    const generatedString = randomstring.generate({
        length: 6,
        capitalization: "uppercase",
        charset: "alphanumeric",
    });
    const date = new Date();
    const hour = String(date.getHours());
    const idWithDate =
        generatedString +
        (hour.length == 1 ? 0 + hour : hour) +
        date.getDate() +
        date.getMonth() +
        String(date.getFullYear()).slice(2);
    return idWithDate;
};
