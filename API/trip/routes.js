const express = require("express");
const passport = require("passport");
const {
  tripsFetch,
  fetchTrip,
  deleteTrip,
  createTrip,
} = require("./controllers");

const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

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

// List Route
router.get("/", tripsFetch);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);

/// Delete Route
router.delete("/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip);


module.exports = router;
