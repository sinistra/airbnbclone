<script context="module">
    export async function preload({ params, query }) {
        const res = await this.fetch(`bookings/list.json`)
        const data = await res.json()

        if (res.status === 200) {
            return { bookings: data }
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    export let bookings
</script>

<svelte:head>
    <title>Your bookings</title>
</svelte:head>

<div>
    {#if !bookings}
        <h1>No bookings yet</h1>
    {:else}
        <h1>Your upcoming bookings</h1>

        <div class="bookings">
            {#each bookings as booking}
                <div class="booking">
                    <p>Booked from {new Date(booking.startDate).toDateString()} to  {new Date(booking.endDate).toDateString()}</p>
                </div>
            {/each}
        </div>
    {/if}
</div>
