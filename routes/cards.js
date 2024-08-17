const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

router.post("/cards", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCard = new Card({ title, description });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    console.error("err", err);
    if (err.code === 11000) {
      res.status(400).json({ message: "Card with this title already exists" });
    }
    res.status(500).json({ message: "Server error in creating the cards" });
  }
});

router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/cards/:title", async (req, res) => {
  try {
    const card = await Card.findOne({ title: req.params.title });
    if (!card) {
      return res.status(404).json({ message: "Card Not Found" });
    }
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
