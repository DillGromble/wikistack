const router = require('express').Router();
const wikiRouter = require('./wiki');
const usersRouter = require('./users');


router.use('/wiki', wikiRouter);

module.exports = router;
