const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du produit est obligatoire'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Le prix du produit est obligatoire']
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est obligatoire'],
    enum: ['périphériques', 'audio', 'accessoires', 'autre'] // À adapter selon tes catégories front
  },
  image: {
    type: String,
    required: [true, 'L’URL de l’image est obligatoire']
  },
  images: {
    type: [String], // Tableau d'URLs d'images
    default: [] // Par défaut, aucun autre image
  },
  stock: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

module.exports = mongoose.model('Product', productSchema);