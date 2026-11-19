const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Importer les différents fichiers de routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const articleRoutes = require('./routes/articleRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Initialiser la connexion à MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Permet de lire le JSON dans le body des requêtes
app.use(cors());         // Autorise les requêtes cross-origin

// Route de test basique
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l’API REST de Somone Tech Gear ! 🚀' });
});

// 2. Monter les différents fichiers de routes sur leurs chemins spécifiques
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/contact', contactRoutes);

// Définition du port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Serveur Express en cours d'exécution sur le port ${PORT}`);
});