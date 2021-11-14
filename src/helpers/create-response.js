module.exports = ({ status, message, body = {}, ...metaRest }) => {
    return Object.freeze({
        meta: {
            status: status,
            message: message,
            ...metaRest,
        },
        body: {
            ...body,
        },
    });
};
