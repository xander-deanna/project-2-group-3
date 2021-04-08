const sequelize = require('../config/connection');
const { Users, Interests } = require('../models');

const userData = require('./userData.json');
const interestData = require('./interestData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const interests = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  


  process.exit(0);
};

seedDatabase();