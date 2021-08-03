const { Trip, User } = require("../../db/models");

exports.fetchQbox = async (tripId, next) => {
    try {
        const foundTrip = await QBox.findByPk(tripId);
        return foundTrip;
    } catch (error) {
        next(error);
    }
};

exports.QboxFetch = async (req, res, next) => {
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


