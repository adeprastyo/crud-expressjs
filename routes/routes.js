const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

// POST /movie
router.post("/movie", (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
  });

  try {
    const movieResult = movie.save();
    res.status(200).json({
      message: "Movie berhasil ditambahkan!",
      data: movie,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all /movie
router.get("/movie", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one /movie/:id
router.get("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /movie/update/:id
router.patch("/movie/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMovieData = req.body;
    const option = { new: true };

    const result = await Movie.findByIdAndUpdate(id, updatedMovieData, option);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /
router.delete("/movie/delete/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const id = req.params.id;
    const deletedMovieData = await Movie.findByIdAndDelete(id);
    res.send(`Movie ${movie.title} successfully deleted`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
