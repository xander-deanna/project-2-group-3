const router = require('express').Router();
const { Users, Interests, UserInterests } = require('../../models');

// router.get('/', (req,res) => {
//     Interests.findAll()
//     .then((interest) => res.render("profile",{interest: interest}))
// .catch((err) =>{
//     console.log(err);
// })
// })

router.post('/addNewInterest', async (req,res) => {
    try {
      const newInterest = await Interests.create({
        interest_name: req.body.interest,
      });
      if (!newInterest) {
        res.status(404).json({ message: 'no information was sent, please try again.' });
        return;
      }
      res.status(200).json(newInterest);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/addInterest', async (req,res) => {
  try {
    const newInterest = await UserInterests.create({
      user_id: req.body.userIdBtn,
      interest_id: req.body.interestIdBtn,
    });
    if (!newInterest) {
      res.status(404).json({ message: 'no information was sent, please try again.' });
      return;
    }
    res.status(200).json(newInterest);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

