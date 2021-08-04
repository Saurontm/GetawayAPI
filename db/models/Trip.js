// const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    title: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    favorite: {
      type: DataTypes.BOOLEAN,
    },
    locationTitle: {
      type: DataTypes.STRING,
    },
    place_id: {
      type: DataTypes.STRING,
    },
  });
  return Trip;
};
