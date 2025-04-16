import express from "express";
import OpenAI from "openai";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  try {
    const { theme } = req.body;

    if (!theme) {
      return res.status(400).json({ error: "Le thème est requis." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Raconte une histoire flippante sur : ${theme}` },
      ],
    });

    if (completion.choices && completion.choices[0] && completion.choices[0].message) {
      return res.json({ histoire: completion.choices[0].message.content });
    } else {
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
