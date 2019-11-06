import sanitizeHtml from 'sanitize-html'

import House from '../../models/house.js'
import User from '../../models/user.js'

export const post = async (req, res, next) => {
    const houseData = req.body.house

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
    User.findOne({where: {email: userEmail}}).then(user => {

        House.findByPk(houseData.id).then(house => {
            if (house) {

                if (house.host !== user.id) {
                    res.writeHead(403, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify({
                        status: 'error',
                        message: 'Unauthorized'
                    }))

                    return
                }

                houseData.description = sanitizeHtml(houseData.description, {
                    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br']
                })

                House.update(houseData, {
                    where: {
                        id: houseData.id
                    }
                })
                    .then(() => {
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        res.end(JSON.stringify({status: 'success', message: 'ok'}))
                    }).catch((err) => {
                    res.writeHead(500, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify({status: 'error', message: err.name}))
                })

            } else {
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify({
                    message: `Not found`
                }))
                return
            }
        })
    })
}
