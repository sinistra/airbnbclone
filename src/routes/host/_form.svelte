<script>
    import {createEventDispatcher, onMount} from 'svelte'

    const dispatch = createEventDispatcher()
    import pell from 'pell'

    export let house = {}
    export let buttonText

    let houseTypes = [
        'Entire house',
        'Room'
    ]

    onMount(() => {
        const editor = pell.init({
            element: document.getElementById('editor'),
            onChange: html => house.description = html,
            defaultParagraphSeparator: 'p',
            styleWithCSS: true,
            actions: [
                'bold',
                'underline',
                {
                    name: 'italic',
                    result: () => pell.exec('italic')
                },
            ]
        })
        editor.content.innerHTML = house.description || ''

        document.querySelector('#fileUpload').addEventListener('change', event => {
            handleImageUpload(event)
        })
    })

    const submit = () => {
        dispatch('submit', {
            'house': house
        })
    }

    const handleImageUpload = event => {
        const files = event.target.files
        const formData = new FormData()
        formData.append('image', files[0])

        fetch('/host/image', {
            method: 'POST',
            body: formData
        })
                .then(response => response.json())
                .then(data => {
                    house.picture = data.path
                })
                .catch(error => {
                    console.error(error)
                })
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

<form on:submit|preventDefault={submit}>
    <p>
        <label>House title</label>
        <input required bind:value={house.title} type="text" placeholder="House title"/>
    </p>
    <p>
        <label>Town</label>
        <input required bind:value={house.town} type="text" placeholder="Town"/>
    </p>
    <p>
        <label>Price per night</label>
        <input required bind:value={house.price} type="number" placeholder="Price per night"/>
    </p>
    <p>
        <label>House picture URL</label>
        <input type="file" id="fileUpload" accept="image/*"/>
        {#if house.picture}
            <img src={house.picture} width="200" alt="House image"/>
        {/if}
    </p>
    <div>
        <label>House description</label>
        <div id="editor"></div>
    </div>

    <div class="grid">
        <div>
            <p>
                <label>Number of guests</label>
                <input required bind:value={house.guests} type="number" placeholder="Number of guests"/>
            </p>
            <p>
                <label>Number of bedrooms</label>
                <input required bind:value={house.bedrooms} type="number" placeholder="Number of bedrooms"/>
            </p>
            <p>
                <label>Number of beds</label>
                <input required bind:value={house.beds} type="number" placeholder="Number of beds"/>
            </p>
            <p>
                <label>Number of baths</label>
                <input required bind:value={house.baths} type="number" placeholder="Number of baths"/>
            </p>
        </div>

        <div>
            <p>
                <label>Does it have Wifi?</label>
                <select bind:value={house.wifi}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </p>
            <p>
                <label>Does it have a kitchen?</label>
                <select bind:value={house.kitchen}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </p>
            <p>
                <label>Does it have heating?</label>
                <select bind:value={house.heating}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </p>
            <p>
                <label>Does it have free parking?</label>
                <select bind:value={house.freeParking}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </p>
            <p>
                <label>Is it the entire place?</label>
                <select bind:value={house.entirePlace}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </p>
            <p>
                <label>Type of house</label>
                <select bind:value={house.type}>
                    {#each houseTypes as item}
                        <option value={item}>
                            {item}
                        </option>
                    {/each}
                </select>
            </p>
        </div>
    </div>
    <button class="styled">{buttonText}</button>
</form>
