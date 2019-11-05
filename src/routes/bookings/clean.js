import Booking from '../../models/booking.js'

export const post = (req, res, next) => {
    Booking.destroy({
        where: {
            paid: false
        }
    })

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })

    res.end(JSON.stringify({
        status: 'success',
        message: 'ok'
    }))
}
