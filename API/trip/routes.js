const express = require("express");
const passport = require("passport");
const { tripsFetch, fetchTrip, createTrip } = require("./controllers");

const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/", tripsFetch);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);

module.exports = router;
