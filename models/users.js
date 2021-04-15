const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

class Users extends Model {
  // checks encrypted password against encrypted password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}



Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      friends: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        get: function() {
          return JSON.parse(this.getDataValue('friends'));
        },
        set: function(val) {
          return this.setDataValue('friends', JSON.stringify(val));
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,  
          max: 16
        },
      },
      image_path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        // encrypts new password password
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        // encrypts an updated password upon update
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'users',
    }
  );
  
  module.exports = Users;