let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");
let keys = require("./keys");

mongoose.connect(keys.dbURI, {useMongoClient: true});

let topic = mongoose.model("topic", new mongoose.Schema({
    title: String,
    description: String,
    removed: {type: Boolean, default: false},
    posts: [{
	title: String,
	content: String,
	date: {type: Date, default: Date.now},
	removed: {type: Boolean, default: false}	
    }]
}));

let userSchema = new mongoose.Schema({});
userSchema.plugin(passportLocalMongoose);
let user = mongoose.model("user", userSchema);

module.exports = {
    topic: topic,
    user: user
};
