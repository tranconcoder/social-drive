class Logout{
    logout (req, res, next) {
        req.logout()
        res.redirect('/')
    }
}

module.exports = new Logout