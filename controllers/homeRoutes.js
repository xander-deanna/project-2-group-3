const router = require('express').Router();
const { Interests, Users, UserInterests } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  console.log(req.session.user_id)
  try {

    // This finds the record for the current user and pull their friends list
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },

    });

      const user = userData.get({ plain: true });
      // Render Homepage
      res.render('homepage', {
        user,
        logged_in: req.session.logged_in
      });

  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/clashes', withAuth, async (req, res) => {
  try {
    //This find the record for the current user and pull their friends list
    const clashData = await Users.findAll({
      include: [
        {
          model: Interests,
          through: UserInterests
        }
      ]
    });

    const clashes = clashData.map((clash) => clash.get({ plain: true }));
    //This is going to map in session id's to use as a comparison
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });
    const user = userData.get({ plain: true });
    
    const idArr =[req.session.user_id];

    for( let i=0; i<user.friends.length; i++){
      idArr.push(parseInt(user.friends[i].id))
     };
    //  console.log(idArr)

    const authClashes = clashes.map((clash) => {
      return { ...clash, id_check: idArr}
    });
    // console.log(authClashes)
    // Render Homepage
    res.render('clashes', {
      clashes: authClashes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Users.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Interests,
        through: UserInterests
      }],
    });

    const user = userData.get({ plain: true });
    

    res.render('friendprofile', {
      ...user,
      logged_in: true
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
      include: [{
        model: Interests,
        through: UserInterests
      }],
    });

    const user = userData.get({ plain: true });
    //pull the list of available interests
    const interestData = await Interests.findAll({
    });

    // Serialize data so the template can read it
    const interests = interestData.map((interest) => interest.get({ plain: true }));

    res.render('profile', {
      ...user,
      interests,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;