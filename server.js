let port = process.env.PORT || 5000;
let express = require("express");
let server = express();
let bodyParser = require("body-parser");
let router = require("./router");

server.set("views", "./views");
server.set("view engine", "ejs");
server.use(express.static("./public"));
//server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(router);

server.listen(port, function() {
    console.log("Node app is running on port " + port);
});
