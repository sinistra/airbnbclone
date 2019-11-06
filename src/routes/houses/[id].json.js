import House from '../../models/house.js'
import Review from '../../models/review.js'

export function get(req, res, next) {
    // the `id` parameter is available because
    // this file is called [id].json.js
    const {id} = req.params

    House.findByPk(id).then(house => {
        if (house) {

            Review.findAndCountAll({
                where: {
                    'houseId': house.id
                }
            }).then(reviews => {
                house.dataValues.reviews = reviews.rows.map(review => review.dataValues)
                house.dataValues.reviewsCount = reviews.count
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify(house.dataValues))
            })

        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: `Not found`
            }))
        }
    })
}
