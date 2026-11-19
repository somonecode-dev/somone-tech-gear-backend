const Contact = require('../models/Contact');

// @desc    Envoyer un nouveau message de contact
// @route   POST /api/contact
// @access  Public
const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactMessage = new Contact({
      name,
      email,
      subject,
      message
    });

    const savedMessage = await contactMessage.save();
    res.status(201).json({ message: 'Message envoyé avec succès', savedMessage });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l’envoi du message', error: error.message });
  }
};

// @desc    Obtenir tous les messages (pour le dashboard admin)
// @route   GET /api/contact
// @access  Public (Dashboard)
const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 }); // Du plus récent au plus ancien
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Supprimer un message
// @route   DELETE /api/contact/:id
// @access  Public (Dashboard)
const deleteContactMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }

    res.status(200).json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
  deleteContactMessage
};