const router = require("express").Router();
const fs = require("fs");
const uniqid = require("uniqid");
let notes = require("../../db/db");

// Returns saved notes 
router.get("/notes", (req, res) => {
  res.json(notes);
});

// Create new notes
router.post("/notes", (req, res) => {
  let newNote = req.body;
  // Creates a unique id for each saved note
  newNote.id = uniqid("");
  console.log(newNote);
  // Adds new note to notes array in db file
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(newNote);
});
// Delete saved note
router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.log(noteId);
  // Filters the notes array to remove selected object
  notes = notes.filter(({ id }) => id !== noteId);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

module.exports = router;
