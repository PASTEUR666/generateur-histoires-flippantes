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
app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt manquant' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ story: completion.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
