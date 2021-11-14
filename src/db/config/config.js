module.exports = {
    development: {
        username: process.env.DB_USERNAME_DEV || "postgres",
        password: process.env.DB_PASSWORD_DEV || "postgres",
        database: process.env.DB_DATABASE_DEV || "be-hj-test-dev",
        host: process.env.DB_HOST_DEV || "127.0.0.1",
        dialect: "postgres",
    },
    test: {
        username: process.env.DB_USERNAME_TEST,
        password: process.env.DB_PASSWORD_TEST,
        database: process.env.DB_DATABASE_TEST,
        host: "127.0.0.1",
        dialect: "postgres",
        logging: false,
    },
    production: {
        username: process.env.DB_USERNAME_PROD,
        password: process.env.DB_PASSWORD_PROD,
        database: process.env.DB_DATABASE_PROD,
        host: process.env.DB_HOST_PROD,
        dialect: "postgres",
    },
};
