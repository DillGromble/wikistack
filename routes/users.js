const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;


router.get('/', function (req, res, next) {
  User.findAll()
  .then( data => res.render('users', {
    users: data
  }))
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  const userPromise = User.findById(req.params.id)
  const pagePromise = Page.findAll({
    where: {
      authorId: req.params.id
    }
  })

  Promise.all([userPromise, pagePromise])
  .then( data => {
    const user = data[0];
    const pages = data[1];

    res.render('singleUser', {user: user, pages: pages})
  })
  .catch(next);
});


module.exports = router;
