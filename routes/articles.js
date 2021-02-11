var express = require('express');
var Article = require('./../models/article')
var router = express.Router();

/* GET home page. */
router.get('/new', function(req, res, next) {
  res.render('new');
});

router.get('/:id', async (req,res,next) => {
  const article = await Article.findById(req.params.id);
  if(article == null) res.redirect('/');
  res.render('show', { article: article });
});

router.post('/', async (req,res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description
  });
  try {
    article = await article.save()
    res.redirect(`/articles/${article.id}`)
  }catch(e) {
    consol.log(e)
    res.render('articles/new', {article:article})
  }

});

router.delete('/:id',async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
});

module.exports = router;
