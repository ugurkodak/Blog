let router = require("express").Router();
let controller = require("./controller");

router.get("/", (req, res, next) => {
    controller.displayHome(req, res);
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

router.get("/newpost", controller.requireAuth, (req, res, next) => {
    controller.displayNewPost(req, res);
}).post("/newpost", controller.requireAuth, (req, res, next) => {
    controller.createNewPost(req, res);
});

router.get("/demo", (req, res, next) => {
    res.render("demos/space", {
	title: "Ugur Kodak | Space Invaders"
    });
});

module.exports = router;
