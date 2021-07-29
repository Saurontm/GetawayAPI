const { Trip } = require("../../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const foundTrip = await Product.findByPk(tripId);
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
