const express = require("express");
const multer = require("multer");
const passport = require("passport");

const { profileFetch, fetchProfile, updateProfile } = require("./controllers");
const router = express.Router();

//multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });
/*
// param middleware (parameter)
router.param("profileId", async (req, res, next, profileId) => {
  // get the profile with id profileId
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    // store it in req
    req.profile = profile;
    next();
  } else {
    // give back response 404 Profile Not Found
    const error = new Error("Profile Not Found.");
    error.status = 404;
    next(error);
  }
});
*/

// param middleware (parameter)
router.param("userId", async (req, res, next, userId) => {
  // get the profile with id userId
  const profile = await fetchProfile(userId, next);
  if (profile) {
    // store it in req
    req.profile = profile;
    next();
  } else {
    // give back response 404 Profile Not Found
    const error = new Error("Profile Not Found.");
    error.status = 404;
    next(error);
  }
});


// List Route
router.get("/:userId", profileFetch);

// Update Route
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateProfile
);

module.exports = router;
