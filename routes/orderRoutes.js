const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrders,
  updateOrderStatus
} = require('../controllers/orderController');

// Route pour créer une commande (POST) et récupérer toutes les commandes (GET)
router.route('/')
  .post(addOrderItems)
  .get(getOrders);

// Route pour mettre à jour le statut d'une commande spécifique via son ID
router.route('/:id/status')
  .put(updateOrderStatus);

module.exports = router;