import dotenv from 'dotenv'

import Booking from '../../models/booking.js'

dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export const post = async (req, res, next) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret)
    } catch (err) {
        res.writeHead(400, {
            'Content-Type': 'application/json'
        })
        console.error(err.message)
        res.end(JSON.stringify({status: 'success', message: `Webhook Error: ${err.message}`}))
        return
    }

    if (event.type === 'checkout.session.completed') {
        const sessionId = event.data.object.id

        try {
            Booking.update(
                {paid: true},
                {where: {sessionId}}
            )
        } catch (err) {
            console.error(err)
        }
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({received: true}))
}

