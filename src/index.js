import express from "express";
import Note from "./models/Note.js";

const app = express();
app.use(express.json());

app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  console.log(req.body);
  try {
    const note = await Note.create(req.body);
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
