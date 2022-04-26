const config = {
    port: process.env.PORT || 5000,
    db_url: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    jwt_refresh_secrete: process.env.JWT_REFRESH_SECRETE,
    jwt_expires_in: "1h",
    jwt_refresh_expires_in: "1d",
    SESSION_SECRET: process.env.SESSION_SECRET,
};

module.exports = config;
