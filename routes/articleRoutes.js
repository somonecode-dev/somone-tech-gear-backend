const express = require('express');
const router = express.Router();
const {
  getArticles,
  createArticle,
  deleteArticle
} = require('../controllers/articleController');

// Route pour lister tous les articles (GET) et en créer un (POST)
router.route('/')
  .get(getArticles)
  .post(createArticle);

// Route pour supprimer un article par son ID (DELETE)
router.route('/:id')
  .delete(deleteArticle);

module.exports = router;