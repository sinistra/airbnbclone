import randomstring from 'randomstring'

export const post = async (req, res, next) => {

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

    const image = req.files.image
    const fileName = randomstring.generate(7) + image.name
    const path = __dirname + '/../../../static/img/houses/' + fileName

    image.mv(path, (error) => {
        if (error) {
            console.error(error)
            res.writeHead(500, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({status: 'error', message: error}))
            return
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({status: 'success', path: '/img/houses/' + fileName}))
    })
}
