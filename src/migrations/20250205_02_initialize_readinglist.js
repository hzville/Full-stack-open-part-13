import { DataTypes } from "sequelize";

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("reading_list", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("reading_list");
};
