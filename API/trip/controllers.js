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
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;

    const newTrip = await Trip.create(req.body);

    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    await req.trip.destroy();
    res.status(204).end(); // NO Content
  } catch (error) {
    next(error);
  }
};
