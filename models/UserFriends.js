// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection.js');

class UserFriends extends Model {}

UserFriends.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      friend_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
          },
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
      modelName: 'user_friends',
    }
  );
  
  module.exports = UserFriends;
