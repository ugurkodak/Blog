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

module.exports.processLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
	if(err) {
	    return next(err);
	}
	if(!user) {
	    return res.redirect("/login");
	}
	req.logIn(user, function(err) {
	    if (err) {
		return next(err);
	    }
	    return res.redirect(req.session.redirect ? req.session.redirect : "/");
	});
    })(req, res, next);
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
	req.session.redirect = req.path;
	return res.redirect("/login");
    }
    next();
}
