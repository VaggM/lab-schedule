const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

const get_images = async(req, res) => {
  const dataFolder = process.env.DATA_FOLDER;

  if (!dataFolder) {
    return res
      .status(500)
      .send({ error: "DATA_FOLDER not specified in .env" });
  }

  const imageFolder = process.env.DATA_FOLDER + "/images/";

  try {
    const images = await readImages(imageFolder);
    return res.status(200).send({ images });
  } catch (error) {
    return res.status(500).send({ error: "Error on reading images folder" });
  }
};

const readImages = async (imageFolder) => {
  try {
    imageFolder = "/home/consert/Dropbox/images/";
    const files = await fs.promises.readdir(imageFolder);
    const images= [];

    files.forEach((file) => {
      const extname = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".gif"].includes(extname)) {
        images.push(file);
      }
    })

    return images.sort();
  } catch (error) {
    console.error('Error reading folder:', error);
    throw error;
  }
};

module.exports = {
  get_images,
};
