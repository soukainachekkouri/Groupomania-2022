const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile");

router.post("/profile", profileCtrl.profile);

module.exports = router;