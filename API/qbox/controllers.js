const { QBox } = require("../../db/models");

exports.fetchQbox = async (tripId, next) => {
    try {
        const foundTrip = await QBox.findByPk(tripId);
        return foundTrip;
    } catch (error) {
        next(error);
    }
};

exports.qboxFetch = async (req, res, next) => {
    try {
        const qboxes = await QBox.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.json(qboxes);
    } catch (error) {
        next(error);
    }
};

exports.createQbox = async (req, res, next) => {
    try {
        req.body.tripId = req.trip.id;
        const newQbox = await QBox.create(req.body);
        res.status(201).json(newQbox);
    } catch (error) {
        next(error);
    }
};


exports.updateQbox = async (req, res, next) => {
    try {
        // if (req.trip.userId === req.user.id) {
        const updatedQbox = await req.qbox.update(req.body);
        console.log("hello");
        res.json(updatedQbox);
        //  } else {
        // const err = new Error("Unauthorized!");
        //  err.status = 401;
        //  return next(err);
        //}
    } catch (error) {
        next(error);
    }
};
