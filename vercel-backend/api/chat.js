import fs from "fs";
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Load API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

let docChunks = [];

// Helper: Create embeddings for each chunk
async function createEmbeddings(text) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });
  return res.data[0].embedding;
}

// Load and embed document
async function loadDocument() {
  const rawText = fs.readFileSync("./data/about-me.txt", "utf8");
  const chunks = rawText.match(/[\s\S]{1,500}/g) || [];
  docChunks = await Promise.all(chunks.map(async chunk => ({
    text: chunk,
    embedding: await createEmbeddings(chunk)
  })));
  console.log(`✅ Document loaded with ${docChunks.length} chunks`);
}

// Cosine similarity
function cosineSim(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (magA * magB);
}

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  const queryEmbedding = await createEmbeddings(message);

  // Find top 3 most relevant chunks
  const relevant = docChunks
    .map(chunk => ({
      ...chunk,
      score: cosineSim(queryEmbedding, chunk.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const context = relevant.map(r => r.text).join("\n");

  // Ask GPT
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that only answers using the provided information about Nathan. If unsure, say you don't know." },
      { role: "user", content: `Answer this using the context:\n${context}\n\nQuestion: ${message}` }
    ]
  });

  res.json({ answer: completion.choices[0].message.content });
});

// Load document at startup
await loadDocument();

export default app;
