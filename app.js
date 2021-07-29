const express = require("express");
const db = require("./db/models");

const app = express();

const tripRoutes = require("./API/trip/routes");
app.use("/trips", tripRoutes);

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true }); //{ force: true }
    console.log("Connection to database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
