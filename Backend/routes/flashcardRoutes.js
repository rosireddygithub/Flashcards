const express = require('express');
const Flashcard = require('../models/Flashcard');

const router = express.Router();

// Create Flashcard
router.post('/', async (req, res) => {
    const flashcard = new Flashcard(req.body);
    await flashcard.save();
    res.send(flashcard);
});

// Read Flashcards
router.get('/', async (req, res) => {
    const flashcards = await Flashcard.find();
    res.send(flashcards);
});

// Update Flashcard
router.put('/:id', async (req, res) => {
    const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(flashcard);
});

// Delete Flashcard
router.delete('/:id', async (req, res) => {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.send({ message: 'Flashcard deleted' });
});

module.exports = router;
