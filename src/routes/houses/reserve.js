import Booking from '../../models/booking.js'
import User from '../../models/user.js'

import canBookThoseDates from './_canBookThoseDates.js'

export const post = async (req, res, next) => {
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const houseId = req.body.houseId
    const sessionId = req.body.sessionId

    if (!await canBookThoseDates(houseId, startDate, endDate)) {
        //busy
        res.writeHead(500, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
            status: 'error',
            message: 'House is already booked'
        }))

        return
    }

    if (!req.session.passport) {
        res.writeHead(403, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
            status: 'error',
            message: 'Unauthorized'
        }))

        return
    }
    const userEmail = req.session.passport.user
    User.findOne({ where: { email: userEmail }}).then(user => {

        Booking.create({
            houseId,
            userId: user.id,
            startDate,
            endDate,
            sessionId
        })
            .then(() => {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify({ status: 'success', message: 'ok' }))
            })

    })
}
