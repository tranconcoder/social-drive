class Private {
    check (req, res, next) {
        if (req.user) {next()}
        else {res.send('Bạn chưa đăng nhập!')}
    }
    private (req, res, next) {
        res.send('PRIVATE PAGE')
    }
}

module.exports = new Private