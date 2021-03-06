const { Trip, User } = require("../../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const foundTrip = await Trip.findByPk(tripId);
    return foundTrip;
  } catch (error) {
    next(error);
  }
};

exports.tripsFetch = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: { model: User, as: "user", attributes: ["username"] },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    req.body.favorite = false;
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;

    const newTrip = await Trip.create(req.body);

    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    if (req.trip.userId === req.user.id) {
      await req.trip.destroy();
      res.status(204).end(); // NO Content
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    if (req.trip.userId === req.user.id) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      const updatedTrip = await req.trip.update(req.body);
      res.json(updatedTrip);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.favoriteTrip = async (req, res, next) => {
  try {
    if (req.trip.userId === req.user.id) {
      req.body.favorite = !req.trip.favorite;
      const updatedTrip = await req.trip.update(req.body);
      res.json(updatedTrip);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
