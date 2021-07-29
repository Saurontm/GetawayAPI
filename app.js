const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//routes
const profileRoutes = require("./API/profile/routes");
const userRoutes = require("./API/user/routes");
const tripRoutes = require("./API/trip/routes");

const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");

//DATEBASE
const db = require("./db/models/index");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//=============== Getaway Routes ===============\\
app.use("/profiles", profileRoutes);
app.use(userRoutes);
app.use("/media", express.static("media"));
app.use("/trips", tripRoutes);

//========== Error Handling Middleware ==========\\
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "internal Server Error." });
});

//=========Path Not Found===========\\
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

//app.get("/users", (req, res) => {
//  res.json(users);
//});
//===============================\\
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};

run();
