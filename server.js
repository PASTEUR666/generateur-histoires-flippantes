const port = 3001;  // Change 3000 à un autre numéro, par exemple 3001 ou 5000
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Raconte-moi une histoire d'horreur courte et flippante en français." }],
      model: "gpt-3.5-turbo",
      max_tokens: 300,
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
