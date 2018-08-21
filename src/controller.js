let mongoose = require('mongoose');
let passport = require('passport');
let models = require('./models');
let geoip = require('geoip-lite');
let weather = require('weather-js');
var ipaddr = require('ipaddr.js');

module.exports.displayHome = (req, res) => {
	let message = 'How about this weather?';
	let locationInfo = geoip.lookup(ipaddr.process(req.ip).toString());
	if (locationInfo) {
		weather.find({ search: JSON.stringify(locationInfo.city) }, (err, result) => {
			if (result[0]) {
				let skycode = result[0].current.skycode;
				switch (skycode) {
					case '0':
					case '1':
					case '2':
					case '3':
					case '4':
					case '17':
					case '35':
						message = 'I hear they\'re calling for thunderstorms';
						break;
					case '9':
					case '11':
					case '12':
					case '40':
						message = 'What a glorious feeling, I\'m happy again';
						break;
					case '27':
					case '28':
					case '29':
					case '30':
					case '31':
					case '32':
					case '33':
					case '34':
						message = 'We couldn\'t ask for a nicer weather, could we?';
						break;
					case '14':
					case '15':
					case '16':
					case '42':
					case '43':
					case '13':
						message = 'Santa Claus is coming to town.'
						break;
					default:
						break;
				}
			}
			return res.render('home', {
				title: 'Ugur Kodak',
				message: message
			});
		});
	}
	else {
		console.error('Couldn\'t get location info from IP: ' + req.ip + '. Default message sent.');
		return res.render('home', {
			title: 'Ugur Kodak',
			message: message
		})
	}
}

// module.exports.displayBlog = (req, res) => {
//     models.topic.find((err, topics) => {
// 	if (err) {
// 	    console.log(err);
// 	    res.end(err);
// 	} else {
// 	    //Sort posts by date
// 	    for (let i = 0; i < topics.length; i++) {
// 		topics[i].posts.sort((a, b) => {
// 		    return b.date - a.date;
// 		});
// 	    }
// 	    //Sort topics by most recent post
// 	    topics.sort((a, b) => {
// 		return b.posts[0].date - a.posts[0].date;
// 	    });
// 	    res.render("blog", {
// 		title: "Ugur Kodak | Blog",
// 		topics: topics
// 	    });
// 	}
//     });
// }

// module.exports.displayLogin = (req, res) => {
//     if (!req.user){
// 	res.render("login", {
// 	    title: "Ugur Kodak | Login"
// 	});
//     }
//     else {
// 	return res.redirect("/posts");
//     }
// }

// module.exports.processLogin = (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
// 	if(err) {
// 	    return next(err);
// 	}
// 	if(!user) {
// 	    return res.redirect("/login");
// 	}
// 	req.logIn(user, function(err) {
// 	    if (err) {
// 		return next(err);
// 	    }
// 	    return res.redirect(req.session.redirect ? req.session.redirect : "/posts");
// 	});
//     })(req, res, next);
// }

// module.exports.processLogout = (req, res) => {
//     req.logout();
//     res.redirect('/');
// }

// module.exports.displayPosts = (req, res) => {
//     models.topic.find((err, topics) => {
// 	if (err) {
// 	    console.log(err);
// 	    res.end(err);
// 	} else {
// 	    res.render("posts", {
// 		title: "Ugur Kodak | Posts",
// 		topics: topics
// 	    });
// 	}
//     });
// }

// module.exports.displayNewPost = (req, res) => {
//     models.topic.find((err, topics) => {
// 	if (err) {
// 	    console.log(err);
// 	    res.end(err);
// 	} else {
// 	    res.render("newpost", {
// 		title: "Ugur Kodak | New Post",
// 		topics: topics
// 	    });
// 	}
//     });
// }

// module.exports.createNewPost = (req, res) => {
//     if (req.body.selectTopic == "new") {
// 	models.topic.create(models.topic({
// 	    title: req.body.topicTitle,
// 	    description: req.body.topicDescription,
// 	    posts: {
// 		title: req.body.postTitle,
// 		content: req.body.postContent
// 	    }
// 	}), (err, topic) => {
// 	    if (err) {
// 		console.log(err);
// 		res.end(err);
// 	    } else {	
// 		res.redirect("/");
// 	    }
// 	});
//     } else {
// 	models.topic.findByIdAndUpdate(req.body.selectTopic, { $push: { posts: {
// 	    title: req.body.postTitle,
// 	    content: req.body.postContent
// 	}}} ,(err, topic) => {
// 	    if (err) {
// 		console.log(err);
// 		res.end(err);
// 	    } else {	
// 		res.redirect("/");
// 	    }
// 	});
//     }
// }

// module.exports.requireAuth = (req, res, next) => {
//     if (!req.isAuthenticated()) {
// 	req.session.redirect = req.path;
// 	return res.redirect("/login");
//     }
//     next();
// }
