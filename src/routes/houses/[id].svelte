<script context="module">
    export async function preload({ params, query }) {
        // the `id` parameter is available because
        // this file is called [id].svelte
        const res = await this.fetch(`houses/${params.id}.json`)
        const data = await res.json()
        if (res.status === 200) {
            return { house: data }
        } else {
            this.error(res.status, data.message)
        }
    }
</script>

<script>
    import { stores } from '@sapper/app'
    import axios from 'axios'
    import { onMount } from 'svelte'
    const { session } = stores()
    import { showModal, showLoginModal } from '../../store.js'
    import DateRangePicker from './_DateRangePicker.svelte'
    export let house
    let dateChosen = false
    let startDate = null
    let endDate = null
    let numberOfNightsBetweenDates = 0
    const getBookedDates = async () => {
        try {
            const houseId = house.id
            const response = await axios.post('/houses/booked', { houseId })
            if (response.data.status === 'error') {
                alert(response.data.message)
                return
            }
            return response.data.dates
        } catch (error) {
            console.error(error)
            return
        }
    }
    let bookedDates = null
    onMount(async () => {
        bookedDates = await getBookedDates()
    })
    const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
        const start = new Date(startDate) //clone
        const end = new Date(endDate) //clone
        let dayCount = 0
        while(end > start) {
            dayCount++
            start.setDate(start.getDate() + 1)
        }
        return dayCount
    }
    const canReserve = async () => {
        try {
            const houseId = house.id
            const response = await axios.post('/houses/check', { houseId, startDate, endDate })
            if (response.data.status === 'error') {
                alert(response.data.message)
                return
            }
            if (response.data.message === 'busy') return false
            return true
        } catch (error) {
            console.error(error)
            return
        }
    }
    const reserve = async () => {
        if (!await canReserve()) {
            alert('The dates chosen are not valid')
            return
        }
        const sessionResponse = await axios.post('stripe/session', { amount: house.price * numberOfNightsBetweenDates })
        if (sessionResponse.data.status === 'error') {
            alert(sessionResponse.data.message)
            return
        }
        const sessionId = sessionResponse.data.sessionId
        const stripePublicKey = sessionResponse.data.stripePublicKey
        const houseId = house.id
        const reserveResponse = await axios.post('houses/reserve', { houseId, startDate, endDate, sessionId })
        if (reserveResponse.data.status === 'error') {
            alert(reserveResponse.data.message)
            return
        }
        const stripe = Stripe(stripePublicKey)
        const { error } = await stripe.redirectToCheckout({
            sessionId
        })
    }
</script>

<style>
    .container {
        display: grid;
        grid-template-columns: 60% 40%;
        grid-gap: 30px;
    }
    aside {
        border: 1px solid #ccc;
        padding: 20px;
        margin-top: 20px;
    }
</style>

<svelte:head>
    <title>{house.title}</title>
</svelte:head>

<header>
    <img src="{house.picture}" width="100%" style="" alt="" />
</header>

<div class="container">
    <main>
        <h1>{house.title}</h1>
        <h2>{house.town}</h2>
        <p><strong>{house.type}</strong></p>
        <p>{house.guests} guests - {house.bedrooms} bedrooms - {house.beds} beds - {house.baths} baths</p>

        {#if house.superhost === true}
            <p><strong>{house.hostName} is a Superhost</strong></p>
            <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
        {/if}

        <p>{@html house.description}</p>

        <a href="javascript:;">Contact host</a>

        <hr>

        {#if (house.wifi || house.kitchen || house.heating || house.freeParking) }
            <h3>Amenities</h3>

            <ul>
                {#if house.wifi}<li>Wifi</li>{/if}
                {#if house.kitchen}<li>kitchen</li>{/if}
                {#if house.heating}<li>heating</li>{/if}
                {#if house.freeParking}<li>freeParking</li>{/if}
            </ul>
        {/if}

        {#if house.entirePlace === true}
            <p><strong>Entire place</strong></p>
            <p>You’ll have the space to yourself and will only share it with those you’re traveling with.</p>
        {/if}

        {#if house.reviewsCount}
            <h3>{house.reviewsCount} Reviews</h3>

            {#each house.reviews as review}
                <p>{new Date(review.createdAt).toDateString()}</p>
                <p>{review.comment}</p>
            {/each}
        {/if}
    </main>

    <aside>
        <h2>Add dates for prices</h2>
        <DateRangePicker on:datesChanged={event => {
        startDate = event.detail.startDate
        endDate = event.detail.endDate
        numberOfNightsBetweenDates = calcNumberOfNightsBetweenDates(startDate, endDate)
        dateChosen = true
        }} bookedDates={bookedDates} />

        {#if dateChosen}
            <br>
            <h2>Price for stay</h2>
            <p>${house.price} x {numberOfNightsBetweenDates}</p>

            <p><strong>Total</strong> ${house.price * numberOfNightsBetweenDates}</p>

            {#if $session.user}
                <button class="reserve styled" on:click={reserve}>Reserve now</button>
            {:else}
                <button class="reserve styled" on:click={() => {
                showModal.set(true)
                showLoginModal.set(true)
                }}>Log in to Reserve</button>
            {/if}
        {/if}
    </aside>
</div>
