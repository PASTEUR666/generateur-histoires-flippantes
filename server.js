import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());  // Pour parser le JSON

// Route pour générer une histoire
app.post('/generate', (req, res) => {
    try {
        // Tu peux remplacer cette partie par le code pour générer une histoire
        const histoire = "Une histoire flippante aléatoire : ..."; // Exemple d'histoire

        // Envoie la réponse au frontend
        res.json({ histoire });
    } catch (err) {
        console.error("Erreur lors de la génération de l'histoire :", err);
        res.status(500).json({ error: "Une erreur interne s'est produite." });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
