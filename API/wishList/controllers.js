const { WishList, WishListTrip } = require("../../db/models");

exports.saved = async (req, res, next) => {
  try {
    console.log(req.body);
    const newWish = await WishList.create({ userId: req.user.id });
    const list = req.body.map((wish) => ({ ...wish, wishListId: newWish.id }));

    const newWishTrips = await WishListTrip.bulkCreate(list);
    res.status(201).json(newWishTrips);
  } catch (error) {
    next(error);
  }
};
