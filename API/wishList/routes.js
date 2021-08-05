const express = require("express");
const passport = require("passport");
// const { jwtStrategy } = require("../../middleware/passport");
const { saved } = require("./controllers");

const router = express.Router();

router.post("/saved", passport.authenticate("jwt", { session: false }), saved);

module.exports = router;
