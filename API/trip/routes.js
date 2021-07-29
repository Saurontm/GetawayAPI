const express = require("express");

const { tripsFetch, fetchTrip, deleteTrip } = require("./controllers");

const multer = require("multer");
const router = express.Router();

//=== param middleware (parameter) ====\\
router.param("tripId", async (req, res, next, tripId) => {
    const trip = await fetchTrip(tripId, next);
    if (trip) {
        req.trip = trip;
        next();
    } else {
        const error = new Error("Trip Not Found.");
        error.status = 404;
        next(error);
    }
});

//multer
const storage = multer.diskStorage({
    destination: "./media",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage });

// List Route
router.get("/", tripsFetch);

// Delete Route
router.delete("/:tripId", deleteTrip);

module.exports = router;
