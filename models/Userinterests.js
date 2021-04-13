const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserInterests extends Model {}


// This model will host the foreign keys for the belongs to many association in the index.
UserInterests.init(
  {
    //this model will allow us to reach interests through the user Id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //This is going to reference the pk of user
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    //this is going to reference the pk of interest
      interest_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'interests',
          key: 'id',
        },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_interests',
  }
);

module.exports = UserInterests;
