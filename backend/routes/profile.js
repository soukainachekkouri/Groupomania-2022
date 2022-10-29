const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile");

router.get("/:userId", profileCtrl.profile);

module.exports = router;