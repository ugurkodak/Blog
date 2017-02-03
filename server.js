let express = require("./config/express");

let app = express();
app.listen(3000);
module.exports = app;

console.log("Server running.");
