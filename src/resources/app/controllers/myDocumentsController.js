class MyDocuments {
  index(req, res, next) {
    let User = req.user;
    User = Object.assign({}, User);
    User = Object.assign(
      {},
      User._doc,
      { header: true },
      { myDocumentsPage: true }
    );
    res.render("myDocuments/myDocuments", User);
  }
}

module.exports = new MyDocuments();
