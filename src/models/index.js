import Blog from "./Blog.js";
import User from "./User.js";
import ReadingList from "./ReadingList.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(ReadingList, { through: ReadingList });
Blog.belongsToMany(ReadingList, { through: ReadingList });

export { Blog, User, ReadingList };
