let router = require("express").Router();
let controller = require("./controller");

router.get("/", (req, res, next) => {
    controller.displayHome(req, res);
});

router.get("/newpost", (req, res, next) => {
    controller.displayNewPost(req, res);
}).post("/newpost", (req, res, next) => {
    controller.createNewPost(req, res);
});

router.get("/demo", (req, res, next) => {
    res.render("demos/space", {
	title: "Ugur Kodak | Space Invaders"
    });
});

module.exports = router;
