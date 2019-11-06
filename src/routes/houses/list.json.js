import House from '../../models/house.js'

export function get(req, res, next) {

    House.findAndCountAll()
        .then(result => {
            const houses = result.rows.map(house => house.dataValues)

            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(houses))
        })

}
