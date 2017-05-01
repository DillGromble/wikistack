const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;




router.get('/', function (req, res, next) {
  res.redirect('/');
});


router.post('/', function (req, res, next) {

  User.findOrCreate({
    where: {
      name: req.body.authName,
    },
    defaults: {
      email: req.body.authEmail
    }
  })
  .spread( function (user, created) {
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags
    });

    return page.save().then( page => page.setAuthor(user));
  })
  .then( newPage => res.redirect(newPage.route))
  .catch(error => res.render('error', error));
});


router.get('/add', function (req, res, next) {
  res.render('addpage');
});


router.get('/:page', function (req, res, next) {
  Page.findOne({
    where: {urlTitle: req.params.page},
    include: [
      {model: User, as: 'author'}
    ]
  })

  .then( data => res.render('wikipage', {
    page: data
  }))
  .catch(next)

});



module.exports = router;
