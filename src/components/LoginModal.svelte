<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<h2>Log in</h2>
<div>
    <form on:submit|preventDefault={() => {
    alert('log in!')
    }}>
        <input id="email" type="email" placeholder="Email address" />
        <input id="password" type="password" placeholder="Password" />
        <button>Log in</button>
        <p>Don't have an account yet? <a href="javascript:;" on:click={() => dispatch('showSignup')}>Sign up</a></p>
    </form>
</div>
