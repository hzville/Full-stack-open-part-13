import sequelize from "./config/database.js";
import { QueryTypes } from "sequelize";

const cli = async () => {
  try {
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });
    blogs.forEach((blog) =>
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    );
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

cli();
