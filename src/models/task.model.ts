import {DataTypes} from "sequelize";
import sequelize from "../configs/database.config";
import User from "./user.model";

const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
    }, {
      tableName: 'tasks',
      timestamps: false
    }
);
  
// Define the association between Task and User models
Task.belongsTo(User);
User.hasMany(Task);

export default Task;