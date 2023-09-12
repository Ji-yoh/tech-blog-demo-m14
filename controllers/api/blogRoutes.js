const router = require("express").Router();
const { Blog } = require("../../models")

router.post("/create", (req, res) => {
    // create route to create new blog post
})

router.put("/:blog_id", (req, res) => {
    // create route to update blog post
})

module.exports = router;