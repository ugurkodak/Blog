let mongoose = require("mongoose");
let keys = require("./keys");

mongoose.connect(keys.dbURI, {useMongoClient: true});

let topic = mongoose.model("topic", mongoose.Schema({
    title: String,
    description: String,
    removed: {type: Boolean, default: false},
    posts: []
}));

let post = mongoose.model("post", mongoose.Schema({
    title: String,
    date: {type: Date, default: Date.now},
    removed: {type: Boolean, default: false}
}));

module.exports = {
    topic: topic,
    post: post
};
