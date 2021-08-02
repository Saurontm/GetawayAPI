const { Profile } = require("../../db/models");

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
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

//do we need? //i figured out yesterday we might NOT need it
exports.profileFetch = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};
