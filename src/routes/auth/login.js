import passport from 'passport'

export const post = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.statusCode = 400
            res.end(JSON.stringify({status: 'error', message: err}))
            return
        }

        if (!user) {
            res.statusCode = 400
            res.end(JSON.stringify({status: 'error', message: 'No user matching credentials'}))
            return
        }

        req.login(user, err => {
            if (err) {
                res.statusCode = 400
                res.end(JSON.stringify({status: 'error', message: err}))
                return
            }
            return res.end(JSON.stringify({status: 'success', message: 'Logged in'}))
        })
    })(req, res, next)
}
