require(`dotenv`).config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoStr = process.env.DATABASE_URL;

mongoose.connect(mongoStr);
const database = mongoose.connection;

database.on("error", (error) => {
  console.error(error);
});

database.once("connected", () => {
  console.log("database connected");
});

const routes = require("./routes/routes");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running in ${process.env.PORT}`);
});
