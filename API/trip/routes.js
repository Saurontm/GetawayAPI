const express = require("express");

const { tripsFetch, fetchTrip } = require("./controllers");

const router = express.Router();

router.get("/", tripsFetch);

module.exports = router;
