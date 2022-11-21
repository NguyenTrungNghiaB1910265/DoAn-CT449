const express = require("express");
const films = require("../controllers/film.controller");

const router = express.Router();

router.route("/")
    .get(films.findAll)
    .post(films.create)
    .delete(films.deleteAll);

router.route("/favorite")
    .get(films.findAllFavorite);

router.route("/:id")
    .get(films.findOne)
    .put(films.update)
    .delete(films.delete);

module.exports = router;