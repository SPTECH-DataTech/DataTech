var express = require("express");
var router = express.Router();

var emailService = require('../services/emailService');

router.post("/sendEmail", function (req, res) {
    emailService.sendEmail(req, res);
});

module.exports = router;