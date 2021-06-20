class Private {
    private (req, res, next) {
        res.send('PRIVATE PAGE')
    }
}

module.exports = new Private