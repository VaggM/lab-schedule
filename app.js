// node.js modules
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

// api handlers
const schedule = require("./routes/schedule");
const images = require("./routes/images");
const dataFolder = process.env.DATA_FOLDER + "/images";

// main website page folder

app.use("/", express.static("./front-end/build"));

app.use("/images", express.static(dataFolder));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/v1/schedule", schedule);

app.use("/api/v1/images", images);

app.listen(8000, () => {
  console.log("8000 is up");
});
