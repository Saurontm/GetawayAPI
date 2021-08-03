const express = require("express");
const passport = require("passport");

const {
    qboxFetch,
    fetchQbox,
    createQbox,
    updateQbox,
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

// List Route
router.get("/", qboxFetch);

// creat QBox Route
router.post(
    "/:tripId",
    passport.authenticate("jwt", { session: false }),
    createQbox
);

// Update QBox Route
router.put(
    "/:tripId",
    passport.authenticate("jwt", { session: false }),
    updateQbox
);

module.exports = router;