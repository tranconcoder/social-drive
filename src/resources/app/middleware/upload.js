const express = require("express");
const app = express();
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const jimp = require("jimp");
const processImage = require("./processImage");

const Auther = require("../../models/auther");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/resources/public/img/avatars");
  },
  filename: function (req, file, cb) {
    const nameFileUpload = `${req.params.id}-upload.${getFileType(
      file.originalname
    )}`;
    cb(null, nameFileUpload);
  },
});

function getFileType(fileName) {
  let arr = fileName.split(".");
  return arr[arr.length - 1];
}

const upload = multer({ storage: storage });

router.post(
  "/profile/upload-avatar/:id",
  upload.single("avatar"),
  processImage.deleteOldImage,
  processImage.processOriginalImage,
  processImage.processSmallImage,
  processImage.processMediumImage,
  processImage.processLargeImage,
  processImage.deleteFileUpload,
  function (req, res, next) {
    res.redirect("back");
    Auther.updateOne({_id: req.params.id}, { avatar: true },
      function (err, result) {
        if (err) console.log('Không thể thay đổi trạng thái tồn tại của AVATAR!!!')
      });
  }
);

module.exports = router;
