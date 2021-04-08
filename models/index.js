const Users = require('./Users');
const Interests = require('./Interests');
const Userinterests = require('./Userinterests')

// Interests belongsTo Users
Interests.belongsToMany(Users, {
    through: Userinterests,
    foreignKey: 'user_id',
  });

// Users have many Interests
Users.belongsToMany(Interests, {
    through: Userinterests,
    foreignKey: 'interest_id'
});