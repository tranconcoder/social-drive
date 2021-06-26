const fs = require("fs");
const jimp = require("jimp");

const smallFileSize = 60;
const mediumFileSize = 120;
const largeFileSize = 300;
const path = `src/resources/public/img/avatars`;

class ProcessImage {
  async deleteOldImage(req, res, next) {
    const smallFileName = `${req.params.id}-small-${smallFileSize}.jpg`;
    const mediumFileName = `${req.params.id}-medium-${mediumFileSize}.jpg`;
    const largeFileName = `${req.params.id}-large-${largeFileSize}.jpg`;
    const originalFileName = `${req.params.id}-original.jpg`;

    await fs.unlink(`${path}/original/${originalFileName}`, () => {
      return;
    });
    await fs.unlink(`${path}/small/${smallFileName}`, () => {
      return;
    });
    await fs.unlink(`${path}/medium/${mediumFileName}`, () => {
      return;
    });
    await fs.unlink(`${path}/large/${largeFileName}`, () => {
      return;
    });
    next();
  }

  async processOriginalImage(req, res, next) {
    const originalFileName = `${req.params.id}-original.jpg`;

    //Original file
    await jimp.read(`${req.file.path}`).then((image) => {
      return image
        .resize(jimp.AUTO, 500)
        .write(`${path}/original/${originalFileName}`);
    });
    next();
  }

  async processSmallImage(req, res, next) {
    const smallFileName = `${req.params.id}-small-${smallFileSize}.jpg`;

    //Small file
    await jimp.read(`${req.file.path}`).then((image) => {
      return image
        .cover(smallFileSize, smallFileSize)
        .write(`${path}/small/${smallFileName}`);
    });
    next();
  }

  async processMediumImage(req, res, next) {
    const mediumFileName = `${req.params.id}-medium-${mediumFileSize}.jpg`;

    //Medium file
    await jimp.read(`${req.file.path}`).then((image) => {
      return image
        .cover(mediumFileSize, mediumFileSize)
        .write(`${path}/medium/${mediumFileName}`);
    });
    next();
  }

  async processLargeImage(req, res, next) {
    const largeFileName = `${req.params.id}-large-${largeFileSize}.jpg`;

    //Large file
    await jimp.read(`${req.file.path}`).then((image) => {
      return image
        .cover(largeFileSize, largeFileSize)
        .write(`${path}/large/${largeFileName}`);
    });
    next();
  }

  async deleteFileUpload(req, res, next) {
    await fs.unlink(`${req.file.path}`, () => {
      return;
    });
    next();
  }
}

module.exports = new ProcessImage();
