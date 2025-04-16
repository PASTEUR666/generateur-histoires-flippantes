import express from "express";
import OpenAI from "openai";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuration OpenAI avec la clé dans le fichier .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  try {
    const { theme } = req.body;

    if (!theme) {
      console.log("Le thème est manquant");
      return res.status(400).json({ error: "Le thème est requis." });
    }

    console.log(`Requête reçue pour générer une histoire avec le thème: ${theme}`);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Raconte une histoire flippante sur : ${theme}` },
      ],
    });

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
