const Users = require('./Users');
const Interests = require('./Interests');

// Interests belongsTo Users
Interests.belongsToMany(Users, {
    foreignKey: 'user_id',
  });

// Users have many Interests
Users.hasMany(Interests, {
    foreignKey: 'interest_id'
});