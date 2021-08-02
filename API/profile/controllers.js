const { Profile } = require("../../db/models");

exports.fetchProfile = async (userId, next) => {
  try {
    const profile = await Profile.findByPk(userId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.profile.userId === req.user.id) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      const updatedProfile = await req.profile.update(req.body);
      res.json(updatedProfile);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.profileFetch = async (req, res, next) => {
  try {
    const profile = req.profile;
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
