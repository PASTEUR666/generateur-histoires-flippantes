// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: 'TA_CLE_API_OPENAI_👉', // Remplace ici
});
const openai = new OpenAIApi(configuration);

app.post('/generate', async (req, res) => {
  const { name, city } = req.body;

  const prompt = `Raconte une histoire d'horreur flippante, courte (moins de 50 secondes à lire), avec un personnage nommé ${name} vivant à ${city}. Elle doit finir de façon mystérieuse.`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 200,
    });

    const story = response.data.choices[0].message.content;
    res.json({ story });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la génération.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
