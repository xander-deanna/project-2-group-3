const sequelize = require('../config/connection.js');

class Interests extends Model {}

Interests.init(
    {
      interest_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      interest_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'interests',
    }
  );
  
  module.exports = Interests;
