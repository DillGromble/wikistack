const router = require('express').Router();
const wikiRouter = require('./wiki');
const usersRouter = require('./users');
const models = require('../models');
const Page = models.Page;
const User = models.User;




router.use('/wiki', wikiRouter);
router.use('/users', usersRouter);

router.get('/', function (req, res, next) {
  Page.findAll()
  .then( data => res.render('index', {
    pages: data
  }));
});



module.exports = router;
