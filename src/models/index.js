import Blog from "./Blog.js";
import User from "./User.js";
import ReadingList from "./ReadingList.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "users_blogs" });

export { Blog, User, ReadingList };
