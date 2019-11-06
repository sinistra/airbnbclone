import Booking from '../../models/booking.js'
import House from '../../models/house.js'
import {Op} from 'sequelize'

export function get(req, res, next) {

    Booking.findAndCountAll({
        where: {
            paid: true,
            endDate: {
                [Op.gte]: new Date(),
            }
        },
        order: [
            ['startDate', 'ASC']
        ]
    })
        .then(async result => {
            const bookings = await Promise.all(result.rows.map(async booking => {
                const data = {}
                data.booking = booking.dataValues
                data.house = (await House.findByPk(data.booking.houseId)).dataValues
                return data
            }))

            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(bookings))
        })

}
