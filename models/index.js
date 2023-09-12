const User = require("./userModel");
const Blog = require("./blogModel");

User.hasMany(Blog, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Blog.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { User, Blog };
