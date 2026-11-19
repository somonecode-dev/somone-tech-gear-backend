const Product = require('../models/Product');

// @desc    Obtenir tous les produits
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Créer un nouveau produit
// @route   POST /api/products
// @access  Public (Dashboard)
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image, images, stock } = req.body;

    const galleryImages = Array.isArray(images) && images.length > 0
      ? images
      : (image ? [image] : []);

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image: image || galleryImages[0] || '',
      images: galleryImages,
      stock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

// @desc    Mettre à jour un produit
// @route   PUT /api/products/:id
// @access  Public (Dashboard)
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Renvoie le produit mis à jour et vérifie les schémas
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// @desc    Supprimer un produit
// @route   DELETE /api/products/:id
// @access  Public (Dashboard)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};