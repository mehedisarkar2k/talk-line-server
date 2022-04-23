const config = {
    port: process.env.PORT || 5000,
    db_url: process.env.DB_URL,
    jwt_secrete: process.env.JWT_SECRETE,
    jwt_refresh_secrete: process.env.JWT_REFRESH_SECRETE,
    jwt_expires_in: "1h",
    jwt_refresh_expires_in: "1d",
    session_secrete: process.env.SESSION_SECRETE,
};

module.exports = config;
