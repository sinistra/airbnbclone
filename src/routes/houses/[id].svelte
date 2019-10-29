<script context="module">
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`houses/${params.id}.json`)
        const data = await res.json()
        if (res.status === 200) {
            return { house: data }
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    export let house
</script>

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

        <a href="#">Contact host</a>

        <hr>

        <h3>Amenities</h3>

        {#each house.amenities as amenity}
            {amenity}
        {/each}

        {#if house.entirePlace === true}
            <p><strong>Entire place</strong></p>
            <p>You’ll have the space to yourself and will only share it with those you’re traveling with.</p>
        {/if}

        <h3>198 Reviews</h3>

        {#each house.reviews as review}
            <img src={review.avatar} alt="" />
            <p><strong>{review.user}</strong></p>
            <p>{review.date}</p>
            <p>{review.comment}</p>
        {/each}
    </main>
</div>
