import Booking from '../../models/booking.js'
import {Op} from 'sequelize'

export const post = async (req, res, next) => {
    const houseId = req.body.houseId

    const getDatesBetweenDates = (startDate, endDate) => {
        let dates = []
        while (startDate < endDate) {
            dates = [...dates, new Date(startDate)]
            startDate.setDate(startDate.getDate() + 1)
        }
        dates = [...dates, endDate]
        return dates
    }

    const results = await Booking.findAll({
        where: {
            houseId: houseId,
            endDate: {
                [Op.gte]: new Date()
            }
        }
    })

    let bookedDates = []

    for (const result of results) {
        const dates = getDatesBetweenDates(new Date(result.startDate), new Date(result.endDate))

        bookedDates = [...bookedDates, ...dates]
    }

    //remove duplicates
    bookedDates = [...new Set(bookedDates.map(date => date))]

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })

    res.end(JSON.stringify({
        status: 'success',
        message: 'ok',
        dates: bookedDates
    }))
}
