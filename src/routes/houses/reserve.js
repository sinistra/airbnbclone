import Booking from '../../models/booking.js'
import User from '../../models/user.js'

export const post = async (req, res, next) => {

    const userEmail = req.session.passport.user
    User.findOne({ where: {email: userEmail}}).then(user => {

        Booking.create({
            houseId: req.body.houseId,
            userId: user.id,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
            .then(() => {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify({ status: 'success', message: 'ok' }))
            })

    })

}
