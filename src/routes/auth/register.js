import User from '../../models/user.js'

export const post = async (req, res) => {
    const { email, password, passwordconfirmation } = req.body

    if (password !== passwordconfirmation) {
        res.statusCode = 400
        res.end(JSON.stringify({ status: 'error', message: 'Passwords do not match' }))
        return
    }

    try {
        const user = await User.create({ email, password })

        req.login(user, err => {
            if (err) {
                res.statusCode = 400
                res.end(JSON.stringify({ status: 'error', message: err }))
                return
            }

            return res.end(JSON.stringify({ status: 'success', message: 'Logged in' }))
        })
    } catch (error) {
        let message = 'An error occurred'
        if (error.name === 'SequelizeUniqueConstraintError') {
            message = 'User already exists'
        }

        res.statusCode = 400
        res.end(JSON.stringify({ status: 'error', message }))
    }
}
