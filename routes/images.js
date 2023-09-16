const express = require("express");
const router = express.Router();

const { get_images } = require("../controllers/images.js");

router.route("/").get(get_images);

module.exports = router;
