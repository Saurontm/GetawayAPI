const express = require("express");

const { tripsFetch, fetchTrip, deleteTrip } = require("./controllers");

const router = express.Router();

router.get("/", tripsFetch);

// Delete Route
router.delete("/:tripId", deleteTrip);

module.exports = router;
