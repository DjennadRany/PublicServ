const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Remplacez 'VOTRE_API_KEY' par votre véritable API key de La Poste
const API_KEY = 'mlxXnH4ILETq7aUwKP5wkfdB/Wp3VvzlTX4hPY9u/v0QBCA4NcaOzv3I1CI8uvtl';

// Configurer le proxy pour rediriger les requêtes vers l'API de La Poste avec l'API key
app.use('/api', createProxyMiddleware({
  target: 'https://api.laposte.fr/geolocalisation/v1',
  changeOrigin: true,
  headers: {
    'X-Okapi-Key': API_KEY,
  },
}));

// Route pour gérer la requête de recherche depuis le frontend
app.get('/api/adresses', async (req, res) => {
  const { q } = req.query;
  try {
    const response = await fetch(`https://api.laposte.fr/geolocalisation/v1/adresses?q=${encodeURIComponent(q)}`, {
      headers: {
        'X-Okapi-Key': API_KEY,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la recherche des adresses :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche des adresses' });
  }
});

// Route pour vérifier que le serveur Express est en cours d'exécution
app.get('/', (req, res) => {
  res.send('Le serveur Express est en cours d\'exécution !');
});

// Démarrer le serveur sur le port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${PORT}`);
});
