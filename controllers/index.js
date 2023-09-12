const router = require("express").Router();

const apiRoutes = require("./api");
const pathRoutes = require("./pathRoutes")

router.use("/api", apiRoutes);
router.use("/", pathRoutes);

module.exports = router;