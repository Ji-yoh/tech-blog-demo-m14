const router = require("express").Router();
// const Blog = require("../models/blogModel")

router.get("/", (req, res) => {
    res.render("home")
})

module.exports = router;