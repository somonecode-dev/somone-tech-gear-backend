const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre de l’article est obligatoire'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Le contenu de l’article est obligatoire']
  },
  author: {
    type: String,
    required: [true, 'L’auteur est obligatoire'],
    default: 'Somone Dev'
  },
  image: {
    type: String,
    required: [true, 'L’URL de l’image est obligatoire']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est obligatoire'],
    default: 'Actualités'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);