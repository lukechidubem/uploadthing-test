const express = require("express");
const appController = require("./appController");

const router = express.Router();

router.get("/", appController.uploadThingUploads);

module.exports = router;
