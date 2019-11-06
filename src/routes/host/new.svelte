<script>
    import axios from 'axios'
    import {goto} from '@sapper/app'

    import Form from './_form.svelte'

    let house = {}

    const submit = async event => {
        const houseDetails = event.detail.house
        try {
            const response = await axios.post('host/new', {'house': houseDetails})
            if (response.data.status === 'error') {
                if (response.data.message === 'SequelizeValidationError') {
                    alert('Validation error')
                } else {
                    alert(response.data.message)
                }
                return
            }

            goto('/host')
        } catch (error) {
            if (error.response && error.response.data.message === 'SequelizeValidationError') {
                alert('Validation error')
            } else {
                alert(error.response.data.message)
            }
            return
        }
    }
</script>

<style>
    form p {
        display: grid;
    }

    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
    }

    .grid > div {
        padding: 50px;
    }
</style>

<h1>Add a new house</h1>
<div>
    <Form buttonText={'Add house'} on:submit={submit}></Form>
</div>
