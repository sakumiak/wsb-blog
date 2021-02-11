var express = require('express');
var Articles = require('./../models/article')
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const articles = await Articles.find().sort({creationDate: 'desc'})
  res.render('index', { articles: articles });
});

module.exports = router;
