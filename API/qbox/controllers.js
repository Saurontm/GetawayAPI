const { QBox, Trip } = require("../../db/models");

exports.fetchQbox = async (tripId, next) => {
    try {
        const foundQbox = await Trip.findByPk(tripId);
        return foundQbox;
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
        req.body.author = req.user.username;
        req.body.authorId = req.user.id;
        const newQbox = await QBox.create(req.body);
        res.status(201).json(newQbox);
    } catch (error) {
        next(error);
    }
};


exports.updateQbox = async (req, res, next) => {
    try {
        if (req.body.authorId === req.user.id) {
            const updatedQbox = await req.qbox.update(req.body);
            res.json(updatedQbox);
        } else {
            const err = new Error("Unauthorized!");
            err.status = 401;
            return next(err);
        }
    } catch (error) {
        next(error);
    }
};
