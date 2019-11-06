import canBookThoseDates from './_canBookThoseDates.js'

export const post = async (req, res, next) => {
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const houseId = req.body.houseId

    let message = 'free'
    if (!await canBookThoseDates(houseId, startDate, endDate)) {
        message = 'busy'
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })

    res.end(JSON.stringify({
        status: 'success',
        message: message
    }))
}
