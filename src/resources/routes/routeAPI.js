const express = require("express");
const router = express.Router();
const APIController = require("../app/controllers/APIController");
const uploadMiddleware = require("../app/middleware/uploadDocument");

router.post("/register/checkUsername", APIController.register.checkUsername);
router.post("/profile/change-password", APIController.profile.checkOldPassword);
router.post("/my-documents/check-file-name", APIController.myDocument.checkFileName);
router.use(uploadMiddleware); //[my-documents/upload/:fileSize] Upload middleware
router.get("/my-documents/get-all", APIController.myDocument.getAll);
router.get("/my-documents/download/:documentId", APIController.myDocument.downloadDocument);

module.exports = router;
