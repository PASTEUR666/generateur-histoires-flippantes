// Importation des modules nécessaires
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;

// Middleware pour gérer les CORS et le parsing du JSON
app.use(cors());
app.use(bodyParser.json());

// Route pour générer une histoire
app.post('/generate', (req, res) => {
    try {
        // Remplacer cette ligne avec le générateur d'histoires flippantes
        const histoire = "Une histoire flippante aléatoire : ..."; // Exemple d'histoire

        // Envoie la réponse au client avec l'histoire générée
        res.json({ histoire });

    } catch (err) {
        // Log l'erreur dans la console si quelque chose ne va pas
        console.error("Erreur lors de la génération de l'histoire :", err);
        
        // Répond au client avec une erreur 500 si nécessaire
        res.status(500).json({ error: "Une erreur interne s'est produite." });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
