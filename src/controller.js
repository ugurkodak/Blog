let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let passport = require('passport');
let model = require('./model');
let geoip = require('geoip-lite');
// TODO: weather-js uses depriciated msn weather api. Use something else
// if it stops working.
let weather = require('weather-js');
let ipaddr = require('ipaddr.js');

module.exports.displayHome = async (req, res) => {
    let message = 'How about this weather?';
    let ip = req.ip;
    if (ipaddr.process(ip).kind() == 'ipv4')
        ip = ipaddr.process(ip).toString();
    else
        ip = ipaddr.parse(ip).toString();
    let locationData = geoip.lookup(ip);
    if (locationData && locationData.city) {
        weather.find({ search: JSON.stringify(locationData.city) }, (err, result) => {
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
                        message = 'I hear they\'re calling for thunderstorms.';
                        break;
                    case '9':
                    case '11':
                    case '12':
                    case '40':
                        message = 'What a glorious feeling, I\'m happy again.';
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
        });
    }
    else
        console.error('Couldn\'t get city info from IP: "' + ip + '". Default message sent.');

    let topics = await model.topic.find({}).exec().catch((err) => {
        return console.error(err);
    });
    let tags = [];
    topics.forEach(topic => {
        topic.tags.forEach(tag => {
            tags.push(tag.toString());
        });
    });
    tags = tags.filter((tag, pos) => {
        return tags.indexOf(tag) == pos;
    });

    let data = [];
    let posts;
    if (req.params.tag) {
        let topics = await model.topic.find({tags: req.params.tag}).select('_id')
        .catch((err) => {
            return console.error(err);
        });
        posts = await model.post.find({'topic_id': {$in: topics}}).
        sort('-date').exec().catch((err) => {
            return console.error(err);
        });
    } else {
        posts = await model.post.find({}).sort('-date').exec().catch((err) => {
            return console.error(err);
        });
    }
    
    for (let i = 0; i < posts.length; i++) {
        let topic = await model.topic.findOne({ _id: posts[i].topic_id }).
            exec().catch((err) => {
                return console.error(err);
            });
        let others = await model.post.find({}).
            where('topic_id').equals(topic._id).where('_id').ne(posts[i]._id)
            .sort('-date').exec().catch((err) => {
                return console.error(err);
            });
        if (i == 0) {
            let content = await model.content.findOne({ _id: posts[i].content_id })
            .exec().catch((err) => {
                    return console.error(err);
                });
            data.push({
                post: posts[i],
                topic: topic,
                others: others,
                content: content
            });
        } else {
            data.push({
                post: posts[i],
                topic: topic,
                others: others
            });
        }
    }
    return res.render('home', {
        title: 'Ugur Kodak | Home',
        message: message,
        data: data,
        tags: tags,
        filter: req.params.tag || ''
    });
}

module.exports.displayPost = async (req, res) => {
    let post = await model.post.findOne({ _id: req.params.post_id }).exec()
    .catch((err) => {
            return console.error(err);
        });
    let topic = await model.topic.findOne({ _id: post.topic_id }).
        exec().catch((err) => {
            return console.error(err);
        });
    let content = await model.content.findOne({ _id: post.content_id })
        .exec().catch((err) => {
            return console.error(err);
        });
    let others = await model.post.find({}).
        where('topic_id').equals(topic._id).where('_id').ne(post._id)
        .sort('-date').exec().catch((err) => {
            return console.error(err);
        });
    return res.render('post', {
        title: 'Ugur Kodak | ' + post.title,
        post: post,
        topic: topic,
        content: content,
        others: others
    });
}

module.exports.displayLogin = (req, res) => {
    if (!req.user) {
        res.render('login', {
            title: 'Ugur Kodak | Login'
        });
    }
    else {
        return res.redirect('/');
    }
}

module.exports.processLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res.redirect('/login');
        req.logIn(user, (err) => {
            if (err)
                return next(err);
            return res.redirect(req.session.redirect ? req.session.redirect : '/');
        });
    })(req, res, next);
}

module.exports.processLogout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports.requireAuth = (req, res, next) => {
    if (process.env.AUTH_REQUIRED == 'true' && !req.isAuthenticated()) {
        req.session.redirect = req.path;
        return res.redirect('/login');
    }
    next();
}

module.exports.displayEditor = (req, res) => {
    model.topic.find({}, 'title', (err, topics) => {
        return res.render('editor', {
            title: 'Ugur Kodak | Editor',
            topics: topics
        });
    });
}

//note: topic_title can be real title if new or _id if existing
module.exports.createNewPost = async (req, res) => {
    let topic;
    let content;
    if (req.body.topic_select == 'new') {
        let tags = req.body.tags.split(' ');
        let formatted_tags = [];
        tags.forEach(tag => {
            formatted_tags.push(tag.charAt(0).toUpperCase() + tag.substr(1).toLocaleLowerCase());
        });
        topic = await model.topic.create(model.topic({
            title: req.body.topic_title,
            tags: formatted_tags
        })).catch((err) => {
            return console.log(err);
        });
    } else {
        topic = await model.topic.findOneAndUpdate({ _id: req.body.topic_title }, { $inc: { post_count: 1 } }, {'new': true}).exec().catch((err) => {
            return console.log(err);
        });
    }
    content = await model.content.create(model.content({
        text: req.body.content
    })).catch((err) => {
        return console.log(err);
    });
    await model.post.create(model.post({
        title: req.body.post_title,
        topic_id: topic._id,
        index: topic.post_count,
        content_id: content._id
    })).catch((err) => {
        return console.log(err);
    });
    res.redirect('/');
}