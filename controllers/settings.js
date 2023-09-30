const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();


const get_settings = (req, res) => {

  const dataFolder = process.env.DATA_FOLDER;
  const settingsFilePath = path.join(dataFolder, 'settings.json'); // Path to your settings file

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
