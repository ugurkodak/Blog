let mongoose = require("mongoose");
let passport = require("passport");
let models = require("./models");

module.exports.displayHome = (req, res) => {
    models.topic.find((err, topics) => {
	if (err) {
	    console.log(err);
	    res.end(err);
	} else {
	    res.render("home", {
		title: "Ugur Kodak | Home",
		topics: topics
	    });
	}
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

module.exports.createNewPost = (req, res) => {
    if (req.body.selectTopic == "new") {
	models.topic.create(models.topic({
	    title: req.body.topicTitle,
	    description: req.body.topicDescription,
	    posts: {
		title: req.body.postTitle,
		content: req.body.postContent
	    }
	}), (err, topic) => {
	    if (err) {
		console.log(err);
		res.end(err);
	    } else {	
		res.redirect("/");
	    }
	});
    }
}

module.exports.requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
	req.session.redirect = req.path;
	return res.redirect("/login");
    }
    next();
}
