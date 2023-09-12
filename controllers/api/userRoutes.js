const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    // create route to register new user
    try {
        const hashedPW = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPW
        });
        const userData = newUser.get({ plain: true });
        req.session.save(() => {
            req.session.user_id = userData.user_id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch(err) {
        console.log(err);
        res.status(500).json("Unexpected error occurred");
    }
});

router.post("/login", (req, res) => {
    // create route to login user
    try {
        const user = User.findOne({
            where: {
                email: req.body.email
            },
            raw: true
        });
        if (!user) {
            res.status(400).json("Incorrect email or password, please try again");
            return;
        }
        const validPW = bcrypt.compare(req.body.password, user.password);
        if (!validPW) {
            res.status(400).json("Incorrect email or password, please try again");
            return;
        }
        req.session.save(() => {
            req.session.user_id = user.user_id;
            req.session.logged_in = true;
            res.status(200).json({ user, message: "You are now logged in!" });
        });
    } catch(err) {
        console.log(err);
        res.status(500).json("Unexpected error occurred");
    }
})

module.exports = router;