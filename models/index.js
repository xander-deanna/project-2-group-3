const Users = require('./users');
const Interests = require('./interests');
const UserInterests = require('./Userinterests');

// Interests belongsTo many users, uses the User Interests table as the through point
Interests.belongsToMany(Users, {
  through: UserInterests,
  foreignKey: 'interest_id',
});

// Users should belong to many interests, uses the User Interests table as the through point
Users.belongsToMany(Interests, {
  through: UserInterests,
  foreignKey: 'user_id'
});

module.exports = {
  Interests,
  Users,
  UserInterests,

};