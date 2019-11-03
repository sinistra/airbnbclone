<script>
    import {createEventDispatcher} from 'svelte';
    import axios from 'axios';

    const dispatch = createEventDispatcher();

    const submit = async () => {
        const response = await axios.post('auth/register', { email, password, passwordconfirmation })
        console.log(response)
    }

    let email = ''
    let password = ''
    let passwordconfirmation = ''

</script>

<h2>Sign up</h2>
<div>
    <form on:submit|preventDefault={submit}>
        <input bind:value={email} type="email" placeholder="Email address" />
        <input bind:value={password} type="password" placeholder="Password" />
        <input bind:value={passwordconfirmation} type="password" placeholder="Enter password again" />
        <button class="styled">Sign up</button>
        <p>Already have an account? <a href="javascript:;" on:click={() => dispatch('showLogin')}>Log in</a></p>
    </form>
</div>
