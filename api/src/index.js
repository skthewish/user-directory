require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;
const cors = require("cors");

require("./config/database");
app.use(cors());

const usersRoute = require("./routes/users");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoute);

app.listen(8001, (error) => {
  if (error) throw error;
  console.log("Server is listenng on " + PORT);
});
