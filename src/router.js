let router = require("express").Router();
let controller = require("./controller");

router.get("/blog", (req, res, next) => {
    controller.displayBlog(req, res);
});

router.get("/", (req, res, next) => {
    res.render("index", {
	title: "Ugur Kodak"
    });
});

router.get("/login", (req, res, next) => {
    controller.displayLogin(req, res);
}).post("/login", (req, res, next) => {
    controller.processLogin(req, res, next);
});

router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
});

router.get("/posts", controller.requireAuth, (req, res, next) => {
    controller.displayPosts(req, res);
})

router.get("/newpost", controller.requireAuth, (req, res, next) => {
    controller.displayNewPost(req, res);
}).post("/newpost", controller.requireAuth, (req, res, next) => {
    controller.createNewPost(req, res);
});

router.get("/space", (req, res, next) => {
    res.render("unity3d/space", {
	title: "Ugur Kodak | Space Invaders"
    });
});

router.get("/psychic", (req, res, next) => {
    res.render("unity3d/psychic", {
	title: "Ugur Kodak | Psychic"
    });
});

module.exports = router;