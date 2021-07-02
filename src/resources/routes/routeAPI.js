const express = require("express");
const router = express.Router();
const APIController = require("../app/controllers/APIController");

router.post("/register/checkUsername", APIController.register.checkUsername);
router.post("/profile/change-password", APIController.profile.checkOldPassword);
router.get("/documents/me/get-all", APIController.documents.getAllMyDocuments);

module.exports = router;
