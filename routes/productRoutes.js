const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Route pour obtenir tous les produits (GET) et en créer un (POST)
router.route('/')
  .get(getProducts)
  .post(createProduct);

// Route pour mettre à jour (PUT) et supprimer (DELETE) un produit via son ID
router.route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;