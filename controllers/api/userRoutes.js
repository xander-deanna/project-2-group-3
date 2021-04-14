const router = require('express').Router();
const { Users, Interests, UserInterests } = require('../../models');
const withAuth = require('../../utils/auth');


// CREATE new user
router.post('/', async (req, res) => {
  try {
    //collects the user data
    const userData = await Users.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      image_path: req.body.image_path,
    });

    //sets up the session
    req.session.save(() => {
      req.session.logged_in = true
      req.session.user_id = userData.id;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//This route is going to push friend data to the front end javascript for Clashes
router.get('/:id', async (req, res) => {
  try {
    //collects the friend data by their ID
    const userData = await Users.findByPk(req.params.id, {
      include: [
        {
          model: Interests,
          through: UserInterests
        }
      ]
    })

    if (!userData) {
      res.status(404).json({ message: 'No information was sent, try again' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//This is going to update the friend data for a user
router.put('/addfriend/:id', async (req, res) => {
  try {

    //collects the friend data
    const userData = await Users.update({
      friends: req.body.friendsArr,
    }, {
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No information was sent, try again' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//This is going to update the image_path data for the user
router.put('/profileid', async (req, res) => {
  try {
    const userImagePath = await Users.update({
      image_path: req.body.image_path,
    }, {
      where: {
        image_path: req.params.id,
      }
    });
    if (!userData) {
      res.status(404).json({ message: 'No image was updated, try again' });
      return;
    }
    res.status(200).json(userImagePath);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches email address
    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Removes the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;