const router = require('express').Router();
const { Users, Interests, UserInterests } = require('../../models');

router.get('/', (req,res) => {
    Interests.findAll()
    .then((interest) => res.render("profile",{interest: interest}))
.catch((err) =>{
    console.log(err);
})
})

module.exports = router;

