const express = require("express");
const passport = require("passport");
const {
  tripsFetch,
  fetchTrip,
  deleteTrip,
  updateTrip,
  createTrip,
  favoriteTrip,
} = require("./controllers");

const multer = require("multer");
const router = express.Router();

// don't you think you can clean up you routes by moving the (multer) to the middleware folder?
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
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip
);

// Update Route
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateTrip
);

//update favorite status
router.put(
  "/fav/:tripId",
  passport.authenticate("jwt", { session: false }),
  favoriteTrip
);

module.exports = router;
