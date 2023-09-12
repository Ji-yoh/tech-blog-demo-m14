const router = require("express").Router();
// const Blog = require("../models/blogModel")

router.get("/", (req, res) => {
    res.end("Hello World!")
})

module.exports = router;