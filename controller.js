let models = require("./models");

module.exports.displayHome = (req, res) => {
    res.render("home", {
	title: "Ugur Kodak | Home"
    });
}

module.exports.displayNewPost = (req, res) => {
    res.render("newpost", {
	title: "Ugur Kodak | New Post"
    });
}
