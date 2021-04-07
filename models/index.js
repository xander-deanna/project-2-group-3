const Users = require('./Users');
const Interests = require('./Interests');

// Interests belongsTo Users
Interests.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

// Users have many Interests
Users.hasMany(Interests, {
    foreignKey: 'interest_id'
});