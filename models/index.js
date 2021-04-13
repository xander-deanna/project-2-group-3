const Users = require('./users');
const Interests = require('./interests');
const UserInterests = require('./userInterests')

// Interests belongsTo many users, uses the User Interests table as the through point
Interests.belongsToMany(Users, {
    through: UserInterests,
    foreignKey: 'user_id',
  });

// Users should belong to many interests, uses the User Interests table as the through point
Users.belongsToMany(Interests, {
    through: UserInterests,
    foreignKey: 'user_id'
});
// This is going to create a 
// Users.belongsToMany(Users, {
//   as: 'friends',
//   foreignKey:'user_id',
//   through: UserFriends
// });

// Users.belongsToMany(Users, {
//   as: 'userFriends',
//   foreignKey:'friend_id',
//   through: UserFriends
// });

module.exports = {
  Interests,
  Users,
  UserInterests,
  UserFriends,

};