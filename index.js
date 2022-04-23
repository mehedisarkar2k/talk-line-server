// external imports
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

// internal imports
const config = require("./config");
// variables
const { app, express } = require("./app");
const port = config.port;

// middlewares
app.use(cors());
app.use(
    expressSession({
        secret: config.session_secrete,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
