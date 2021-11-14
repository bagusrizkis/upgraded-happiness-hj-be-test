const randomstring = require("randomstring");

module.exports = () => {
    const generatedString = randomstring.generate({
        length: 6,
        capitalization: "uppercase",
        charset: "alphanumeric",
    });
    const date = new Date();
    const idWithDate =
        generatedString +
        date.getHours() +
        date.getDate() +
        date.getMonth() +
        String(date.getFullYear()).slice(2);
    return idWithDate;
};
