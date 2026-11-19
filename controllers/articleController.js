const Article = require('../models/Article');

// @desc    Obtenir tous les articles
// @route   GET /api/articles
// @access  Public
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 }); // Du plus récent au plus ancien
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Créer un nouvel article
// @route   POST /api/articles
// @access  Public (Dashboard)
const createArticle = async (req, res) => {
  try {
    const { title, content, author, image, category } = req.body;

    const newArticle = new Article({
      title,
      content,
      author,
      image,
      category
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

// @desc    Supprimer un article
// @route   DELETE /api/articles/:id
// @access  Public (Dashboard)
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    res.status(200).json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle
};