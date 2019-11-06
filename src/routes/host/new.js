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

    houseData.description = sanitizeHtml(houseData.description, {
        allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br']
    })

    const userEmail = req.session.passport.user
    User.findOne({where: {email: userEmail}}).then(user => {
        houseData.host = user.id
        House.create(houseData)
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

    })
}
