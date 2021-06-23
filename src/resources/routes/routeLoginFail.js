const express = require("express");
const router = express.Router();

const loginFailController = require("../app/controllers/loginFailController");

router.get('/', loginFailController.loginFail);

module.exports = router;
