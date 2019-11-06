<script>
  import {createEventDispatcher} from 'svelte'
  import axios from 'axios'
  import {stores} from '@sapper/app'

  const {session} = stores();

    const dispatch = createEventDispatcher();

    let email = '';
    let password = '';

    const submit = async () => {
        try {
            const response = await axios.post('auth/login', {email, password});
            if (response.data.status === 'error') {
                alert(response.data.message);
                return
            }
            session.set({user: email});
            dispatch('closeModal')
        } catch (error) {
            alert(error.response.data.message);

        }
    }
</script>

<h2>Log in</h2>
<div>
    <form on:submit|preventDefault={submit}>
        <input bind:value={email} type="email" placeholder="Email address"/>
        <input bind:value={password} type="password" placeholder="Password"/>
        <button class="styled">Log in</button>
        <p>Don't have an account yet? <a href="javascript:" on:click={() => dispatch('showSignup')}>Sign up</a></p>
    </form>
</div>
