const mongoose = require("mongoose");

const dbURL = process.env.DB_URL;

mongoose
  .connect(dbURL)
  .then(() => console.log("Database connected."))
  .catch((err) => console.log(err));
