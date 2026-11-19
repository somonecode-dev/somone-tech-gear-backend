const express = require('express');
const router = express.Router();
const {
  createContactMessage,
  getContactMessages,
  deleteContactMessage
} = require('../controllers/contactController');

// Route pour envoyer un message (POST) et lister tous les messages (GET)
router.route('/')
  .post(createContactMessage)
  .get(getContactMessages);

// Route pour supprimer un message par son ID (DELETE)
router.route('/:id')
  .delete(deleteContactMessage);

module.exports = router;