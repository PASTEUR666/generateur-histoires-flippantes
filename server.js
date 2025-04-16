import express from "express";
import OpenAI from "openai";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Clé API OpenAI
const openai = new OpenAI({
  apiKey: "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", // Remplace par ta clé API OpenAI
});

app.post("/generate", async (req, res) => {
  try {
    const { theme } = req.body;

    // Vérifie si le thème est fourni
    if (!theme) {
      console.log("Le thème est manquant");
      return res.status(400).json({ error: "Le thème est requis." });
    }

    console.log(`Requête reçue pour générer une histoire avec le thème: ${theme}`);

    // Envoi de la requête à OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Raconte une histoire flippante sur : ${theme}` },
      ],
    });

    // Vérifie si la réponse de OpenAI contient bien une histoire
    if (completion.choices && completion.choices[0] && completion.choices[0].message) {
      const histoire = completion.choices[0].message.content;
      console.log("Histoire générée:", histoire);
      return res.json({ histoire });
    } else {
      console.log("Aucune histoire générée");
      return res.status(500).json({ error: "Aucune histoire générée" });
    }
  } catch (err) {
    console.error("Erreur lors de la génération de l'histoire", err);
    return res.status(500).json({ error: "Erreur lors de la génération de l'histoire" });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
