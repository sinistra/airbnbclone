import Booking from '../../models/booking.js'
import {Op} from 'sequelize'

export default async (houseId, startDate, endDate) => {
    const results = await Booking.findAll({
        where: {
            houseId: houseId,
            startDate: {
                [Op.lte]: new Date(endDate)
            },
            endDate: {
                [Op.gte]: new Date(startDate)
            }
        }
    })
    return !(results.length > 0)
}
