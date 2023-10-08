const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

const get_images = async (req, res) => {
  const dataFolder = process.env.DATA_FOLDER;

  if (!dataFolder) {
    return res
      .status(500)
      .send({ error: "DATA_FOLDER not specified in .env" });
  }

  const imageFolder = process.env.DATA_FOLDER + "/images";

  readFilenames(imageFolder, (err, filenames) => {
    if (err) {
      return res.status(500).send({ error: "Error on reading images folder" });
    }

    const images= [];

    filenames.forEach((file) => {
      const extname = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".gif"].includes(extname)) {
        images.push(file);
      }
    })

    images.sort();

    return res.status(200).send({ images });

  });
};

const readFilenames = (folderPath, callback) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, files);
  });
}

module.exports = {
  get_images
};
