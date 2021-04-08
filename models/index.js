const Users = require('./Users');
const Interests = require('./Interests');
const UserInterests = require('./UserInterests')

// Interests belongsTo Users
Interests.belongsToMany(Users, {
    through: UserInterests,
    foreignKey: 'user_id',
  });

// Users have many Interests
Users.belongsToMany(Interests, {
    through: UserInterests,
    foreignKey: 'interest_id'
});

module.exports = {
  Interests,
  Users,
  UserInterests,

};