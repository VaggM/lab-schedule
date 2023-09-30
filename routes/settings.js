const express = require("express");
const router = express.Router();

const { get_settings } = require("../controllers/settings.js");

router.route("/").get(get_settings);

module.exports = router;
