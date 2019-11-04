<script>
    import { createEventDispatcher } from 'svelte'
    import axios from 'axios'
    import { stores } from '@sapper/app'

    const { session } = stores()
    const dispatch = createEventDispatcher()
    let email = ''
    let password = ''
    let passwordconfirmation = ''
    const submit = async () => {
        try {
            const response = await axios.post('auth/register', { email, password, passwordconfirmation })
            if (response.data.status === 'error') {
                alert(response.data.message)
                return
            }
            session.set({ user: email })
            dispatch('closeModal')
        } catch (error) {
            alert(error.response.data.message)
            return
        }
    }
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
