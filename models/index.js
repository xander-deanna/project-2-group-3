const Users = require('./Users');
const Interests = require('./Interests');
const UserInterests = require('./UserInterests')

// Interests belongsTo many users, uses the User Interests table as the through point
Interests.belongsToMany(Users, {
    through: UserInterests,
    foreignKey: 'user_id',
  });

// Users should belong to many interests, uses the User Interests table as the through point
Users.belongsToMany(Interests, {
    through: UserInterests,
    foreignKey: 'interest_id'
});

Users.hasMany(Friends, {
  foreignKey:'friend_id'
});

Friend.belongsto(Users, {
  foreighKey:'friend_id'
});

module.exports = {
  Interests,
  Users,
  UserInterests,

};