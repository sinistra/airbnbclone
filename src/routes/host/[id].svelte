<script context="module">
    export async function preload({params, query}) {
        // the `id` parameter is available because
        // this file is called [id].svelte
        return {id: params.id}
    }
</script>

<script>
    import axios from 'axios'
    import {goto} from '@sapper/app'
    import {onMount} from 'svelte'

    import Form from './_form.svelte'

    let loading = true;
    let house = null;

    export let id;

    onMount(async () => {
        const res = await fetch(`houses/${id}.json`);

        if (res.status === 200) {
            const data = await res.json();
            house = data;

            loading = false
        } else {
            console.error(res.status, data.message);
        }
    });

    const submit = async event => {
        const houseDetails = event.detail.house;

        try {
            const response = await axios.post('host/edit', {'house': houseDetails});
            if (response.data.status === 'error') {
                if (response.data.message === 'SequelizeValidationError') {
                    alert('Validation error')
                } else {
                    alert(response.data.message)
                }
                return
            }

            alert('House data saved successfully');
            goto('/host')
        } catch (error) {
            if (error.response && error.response.data.message === 'SequelizeValidationError') {
                alert('Validation error')
            } else {
                alert(error.response.data.message)
            }

        }

    }
</script>

<div>
    {#if !loading && house}
        <h1>Edit house data</h1>
        <div>
            <Form house={house} buttonText={'Save'} on:submit={submit}></Form>
        </div>
    {/if}
</div>
