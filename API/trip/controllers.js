const { Trip } = require("../../db/models");

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
      //   include: { model: User, as: "user", attributes: ["name"] },
    });
    res.json(trips);
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
