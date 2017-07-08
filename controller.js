let mongoose = require("mongoose");
let passport = require("passport");
let models = require("./models");

module.exports.displayHome = (req, res) => {
    res.render("home", {
	title: "Ugur Kodak | Home"
    });
}

module.exports.displayLogin = (req, res) => {
    if (!req.user){
	res.render("login", {
	    title: "Ugur Kodak | Login"
	});
    }
    else {
	return res.redirect("/");
    }
}

module.exports.processLogin = () => {
    return passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
    })
}

module.exports.processLogout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports.displayNewPost = (req, res) => {
    res.render("newpost", {
	title: "Ugur Kodak | New Post"
    });
}

module.exports.requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
	return res.redirect("/login");
    }
    next();
}
