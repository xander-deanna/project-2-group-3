const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Friend extends Model {}

Friend.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
          },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'friend',
    }
  );
  
  module.exports = Friend;
