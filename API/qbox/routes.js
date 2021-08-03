const express = require("express");

const {
    qboxFetch,
    fetchQbox,
    createQbox,
} = require("./controllers");

const router = express.Router();

//=== param middleware (parameter) ====\\
router.param("tripId", async (req, res, next, tripId) => {
    const trip = await fetchQbox(tripId, next);
    if (trip) {
        req.trip = trip;
        next();
    } else {
        const error = new Error("Trip Not Found.");
        error.status = 404;
        next(error);
    }
});