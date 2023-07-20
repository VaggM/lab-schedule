const express = require("express");
const router = express.Router();

const { get_schedule } = require("../controllers/schedule.js");

router.route("/").get(get_schedule);

module.exports = router;
