import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

class LoginSession extends Model {}

LoginSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "users", key: "username" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "login_session",
  }
);

export default LoginSession;
