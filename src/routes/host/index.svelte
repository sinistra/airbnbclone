<script>
    import {onMount} from 'svelte'

    let loading = true
    let bookings
    let houses

    onMount(async () => {
        const res = await fetch(`host/list.json`)

        if (res.status === 200) {
            const data = await res.json()
            houses = data.houses
            bookings = data.bookings
            loading = false
        } else {
            console.error(res.status, data.message);
        }
    })
</script>

<style>
    h1 {
        padding-bottom: 30px;
    }

    .container {
        display: grid;
        grid-template-columns: 60% 40%;
        grid-gap: 50px;
    }

    .list {
        display: grid;
        grid-template-columns: 100%;
        grid-gap: 40px;
        margin-top: 60px;
    }

    .house {
        display: grid;
        grid-template-columns: 30% 70%;
        grid-gap: 40px;
    }

    .booking img, .house img {
        width: 180px;
    }
</style>

<svelte:head>
    <title>Your houses and bookings</title>
</svelte:head>

<div>
    {#if !loading}
        {#if !houses}
            <h1>You don't have houses yet</h1>
            <p><a href="/host/new">Add a house now</a></p>
        {:else}
            <div class="container">
                <div class="houses">
                    <h1>Your houses</h1>

                    <div class="list">
                        {#each houses as house}
                            <div class="house">
                                <img src="{house.picture}" alt="House picture"/>
                                <div>
                                    <h2>{house.title} in {house.town}</h2>
                                    <p>
                                        <a href="/houses/{house.id}">View house page</a>
                                    </p>
                                    <p>
                                        <a href="/host/{house.id}">Edit house details</a>
                                    </p>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
                <div class="bookings">
                    <h1>Bookings</h1>
                    {#if !bookings}
                        <p>No bookings yet</p>
                    {:else}
                        <div class="list">
                            {#each bookings as booking}
                                <div class="booking">
                                    <div>
                                        <h2>{booking.house.title} in {booking.house.town}</h2>
                                        <p>Booked from {new Date(booking.booking.startDate).toDateString()}
                                            to  {new Date(booking.booking.endDate).toDateString()}</p>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        {/if}
    {/if}
</div>
