let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let keys = require('./keys');

mongoose.connect(keys.dbURI, {useMongoClient: true});

let topic = mongoose.model('topic', new mongoose.Schema({
    title: String,
    tags: [String]
}));

let post = mongoose.model('post', new mongoose.Schema({
    date: {type: Date, default: Date.now},
    title: String,
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'topic' },
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'content' } 
    // removed: {type: Boolean, default: false} maybe add ability to make a post private
}));

let content = mongoose.model('content', new mongoose.Schema({
    text: String,
}));

let userSchema = new mongoose.Schema({});
userSchema.plugin(passportLocalMongoose);
let user = mongoose.model('user', userSchema);

module.exports = {
    topic: topic,
    post: post,
    content: content,
    user: user
};
