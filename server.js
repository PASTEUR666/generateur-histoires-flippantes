import express from "express";
import OpenAI from "openai";
import cors from "cors";
import bodyParser from "body-parser";

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
    if (!theme) {
      return res.status(400).json({ error: "Le thème est requis." });
    }

    console.log(`Génération d'histoire pour le thème: ${theme}`);

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

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
