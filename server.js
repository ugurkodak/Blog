let port = process.env.PORT || 5000;
let express = require("express");
let server = express();
let session = require('express-session');
let passport = require("passport");
let bodyParser = require("body-parser");
let router = require("./src/router");
let models = require("./src/models");

server.set('trust proxy', true);
server.set("views", __dirname + "/src/views");
server.set("view engine", "pug");
server.use(express.static(__dirname + "/src/static"));
server.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(router);

passport.use(models.user.createStrategy());
passport.serializeUser(models.user.serializeUser());
passport.deserializeUser(models.user.deserializeUser());

server.listen(port, function() {
    console.log("Node app is running on port " + port);
});
