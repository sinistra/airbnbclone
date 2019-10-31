<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<h2>Sign up</h2>
<div>
    <form on:submit|preventDefault={() => {
    alert('sign up!')
    }}>
        <input id="email" type="email" placeholder="Email address"/>
        <input id="password" type="password" placeholder="Password"/>
        <input id="passwordconfirmation" type="password" placeholder="Enter password again"/>
        <button class="styled">Sign up</button>
        <p>Already have an account? <a href="javascript:;" on:click={() => dispatch('showLogin')}>Log in</a></p>
    </form>
</div>
