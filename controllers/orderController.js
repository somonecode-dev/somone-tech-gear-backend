const Order = require('../models/Order');

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Public / Client
const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Aucun article commandé' });
    }

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la commande', error: error.message });
  }
};

// @desc    Obtenir toutes les commandes (pour l'admin / dashboard)
// @route   GET /api/orders
// @access  Public (Dashboard)
const getOrders = async (req, res) => {
  try {
    // .populate() permet de récupérer les détails des produits liés aux IDs
    const orders = await Order.find({}).populate('orderItems.product', 'name price image');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Mettre à jour le statut d'une commande
// @route   PUT /api/orders/:id/status
// @access  Public (Dashboard)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    order.status = status || order.status;
    if (status === 'Validée' || status === 'Livrée') {
      order.isPaid = true;
      order.paidAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

module.exports = {
  addOrderItems,
  getOrders,
  updateOrderStatus
};