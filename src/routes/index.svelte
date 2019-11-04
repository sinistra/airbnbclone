<script context="module">
    export async function preload({ params, query }) {
        const res = await this.fetch(`houses/list.json`)
        const data = await res.json()
        if (res.status === 200) {
            return { houses: data }
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import House from './houses/_House.svelte'
    export let houses
</script>

<style>
    .houses {
        display: grid;
        grid-template-columns: 400px 400px 400px;
        grid-template-rows: 300px 300px;
        grid-gap: 40px;
    }
</style>

<svelte:head>
    <title>Airbnb Clone</title>
</svelte:head>

<div>
    <h2>Places to stay</h2>

    <div class="houses">
        {#each houses as house}
            <House {...house} />
        {/each}
    </div>
</div>
