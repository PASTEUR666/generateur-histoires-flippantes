import express from "express";
import OpenAI from "openai";
import cors from "cors";
import bodyParser from "body-parser";

// Création d'une instance express
const app = express();
const port = process.env.PORT || 3000;

// Utilisation du middleware
app.use(cors());
app.use(bodyParser.json());

// Clé API OpenAI
const openai = new OpenAI({
  apiKey: "TA_CLÉ_API_ICI", // Remplace ici par ta clé OpenAI
});

app.post("/generate", async (req, res) => {
  try {
    // Récupérer le thème
    const { theme } = req.body;
    
    if (!theme) {
      return res.status(400).json({ error: "Le thème est requis." });
    }

    // Demander à OpenAI de générer une histoire
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Raconte une histoire flippante sur : ${theme}` },
      ],
    });

    const histoire = completion.choices[0].message.content;
    res.json({ histoire });
  } catch (err) {
    console.error("Erreur lors de la génération de l'histoire", err);
    res.status(500).json({ error: "Erreur lors de la génération de l'histoire" });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
