// const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    title: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    user: { type: DataTypes.STRING },
    profilePicture: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
  });
  return Trip;
};
