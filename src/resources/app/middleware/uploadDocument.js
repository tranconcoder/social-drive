const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");

const auther = require("../../models/auther");
const document = require("../../models/document");
const baseJs = require("./baseMiddleware");

const documentPath = "src/resources/file/document";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const application = getApplicationWithFileName(file.originalname);
    if (application === "word") {
      const wordLink = `src/resources/file/document/word/${req.params.id}`;

      if (!fs.existsSync(wordLink)) fs.mkdirSync(wordLink);
      cb(null, wordLink);
    } else if (application === "excel") {
      const excelLink = `src/resources/file/document/excel/${req.params.id}`;

      if (!fs.existsSync(excelLink)) fs.mkdirSync(excelLink);
      cb(null, excelLink);
    } else {
      const powerPointLink = `src/resources/file/document/powerPoint/${req.params.id}`;

      if (!fs.existsSync(powerPointLink)) fs.mkdirSync(powerPointLink);
      cb(null, powerPointLink);
    }
  },
  filename: function (req, file, cb) {
    cb(null, `fileProcessing${baseJs.getFileType(file.originalname)}`);
  },
});



function processFileDocumentUpload(req, res, next) {
  // Đổi tên file khớp với khi người dùng nhập
  fs.rename(
    req.file.path,

    `${documentPath}/${getApplicationWithFileName(req.file.originalname)}/${
      req.body.id
    }/${req.body.fileName}${baseJs.getFileType(req.file.originalname)}`,

    async function (err) {
      if (!err) {
        let documentFile = await {
          userId: req.body.id,
          name: `${req.body.fileName}${baseJs.getFileType(
            req.file.originalname
          )}`,
          application: getApplicationWithFileName(req.file.originalname),
          size: req.file.size,
          mode: await req.body.fileOption,
          locate: `${documentPath}/${getApplicationWithFileName(
            req.file.originalname
          )}/${req.body.id}/${req.body.fileName}${baseJs.getFileType(req.file.originalname)}`,
          uploadAt: Date.now(),
        };

        await document.create(documentFile, function (err, result) {
          if (err) console.log("Mongoose: Can't save the document file!!!");
        });

        next();
      }
    }
  );
}

const uploadFileDocument = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

router.post(
  "/api/my-documents/upload/:id/:size",
  function (req, res, next) {
    let data = [];
    
    req.on('data', (chunk) => {
      data.push(chunk)
    })

    req.on('end', () => {
      console.log('data: ', Buffer.concat(data))
    })
  },
  uploadFileDocument.single("documentFile"),
  processFileDocumentUpload,
  function (req, res, next) {
    req.on("data", (chunk) => {
      console.log(chunk)
    })
    res.redirect("/my-documents");
  }
);

module.exports = router;
