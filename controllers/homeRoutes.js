const router = require('express').Router();
const { Interests, Users } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    //This find the record for the current user and pull their friends list
    // const friendData = await Users.findOne({
    //   // where: {
    //   //   post_id: req.session.user_id
    //   // },
    //   // include: ['friends'],
    // });

    // const friends = friendData.map((post) => post.get({ plain: true }));
    // Render Homepage
    res.render('homepage', {
      // ...friends,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Interests }],
    });

    const user = userData.get({ plain: true });
    //pull the list of available interests
    const interestData = await Interests.findAll({
    });

    // Serialize data so the template can read it
    const interests = interestData.map((interest) => interest.get({ plain: true }));

    res.render('profile', {
      ...user, interests,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('profile');
});

module.exports = router;