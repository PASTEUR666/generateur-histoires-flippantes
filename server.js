import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route pour générer une histoire
app.post('/generate', (req, res) => {
    // Tu peux remplacer cette partie par le code pour générer une histoire
    const histoire = "Une histoire flippante aléatoire : ..."; // Exemple d'histoire

    // Envoie la réponse au frontend
    res.json({ histoire });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

    const story = completion.choices[0].message.content;
    res.json({ story });
  } catch (err) {
    console.error("Erreur OpenAI:", err);
    res.status(500).json({ story: "Erreur lors de la génération de l’histoire." });
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
