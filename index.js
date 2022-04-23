// external imports
const dotenv = require("dotenv");
dotenv.config();

// internal imports
const config = require("./config");
// variables
const app = require("./app");
const port = config.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
