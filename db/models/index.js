"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//relationships
//user and profile (one to one)
db.User.hasOne(db.Profile, {
  as: "profile",
  foreignKey: "userId",
});

db.Profile.belongsTo(db.User, { as: "user" });

//user and trips (one to many)
db.User.hasMany(db.Trip, {
  foreignKey: "userId",
  allowNull: false,
  as: "trips",
});

db.Trip.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

db.User.hasOne(db.WishList, { foreignKey: "userId", as: "wishList" });
db.WishList.belongsTo(db.User, { as: "user" });
db.WishList.belongsToMany(db.Trip, {
  foreignKey: "wishListId",
  through: db.WishListTrip,
});
db.Trip.belongsToMany(db.WishList, {
  foreignKey: "tripId",
  through: db.WishListTrip,
});


//trips and qbox (one to many)
db.Trip.hasMany(db.QBox, {
  foreignKey: "tripId",
  allowNull: false,
  as: "qbox",
});

db.QBox.belongsTo(db.Trip, {
  foreignKey: "tripId",
  as: "trip",
});


module.exports = db;
