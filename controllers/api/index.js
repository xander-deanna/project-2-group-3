const router = require('express').Router();
const userRoutes = require('./userRoutes');
const interestRoutes = require('./interestRoutes');


router.use('/users', userRoutes);
router.use('/interests', interestRoutes);

module.exports = router;