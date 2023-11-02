const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();


const get_settings = (req, res) => {

  const dataFolder = process.env.DATA_FOLDER;

  if (!dataFolder) {
    return res
      .status(500)
      .send({ error: "DATA_FOLDER not specified in .env" });
  }

  const settingsFilePath = process.env.DATA_FOLDER + "/settings.json";

  try {
    const settingsData = fs.readFileSync(settingsFilePath, 'utf8');
    const settings = JSON.parse(settingsData);
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(500).json({ error: "Error reading settings" });
  }
};

module.exports = {
  get_settings
};
