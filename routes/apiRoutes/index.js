const router = require("express").Router();
const fs = require("fs");
const uniqid = require("uniqid");
let notes = require("../../db/db");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  let newNote = req.body;

  newNote.id = uniqid("");
  console.log(newNote);

  notes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));

  res.json(newNote);
});
router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.log(noteId);
  notes = notes.filter(({ id }) => id !== noteId);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

module.exports = router;
