<script>
  import axios from 'axios'
  import { stores } from '@sapper/app'
  import { showModal, showLoginModal, showRegistrationModal } from '../store.js'

  const { session } = stores()

  export let segment
</script>

<style>
  .nav-container {
    border-bottom: 1px solid #eee;
    height: 50px;
  }

  nav {
    font-weight: 300;
    padding: 0 1em;
  }

  img {
    float: left;
  }

  ul {
    margin: 0;
    padding: 0;
    float: right;
    margin-top: -25px;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255,62,0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
  .logo {
    display: inline;
  }
</style>

<div class="nav-container">
  <a class="logo" href="/"><img src="/img/logo.png" alt="" /></a>
  <nav>
    <ul>
      {#if $session.user}
        <li style="padding: 1em 0.5em;">{$session.user}</li>
        <li><a href="/host/new">Add house</a></li>
        <li><a href="/host">Your houses</a></li>
        <li><a href="/bookings">Bookings</a></li>
        <li><a href='javascript:;' on:click={async () => {
          await axios.post('auth/logout')
          session.set({ user: null })
        }}>Log out</a></li>
      {:else}
        <li><a class='{segment === undefined ? "selected" : ""}' href='become-a-host'>Become a host</a></li>
        <li><a href='javascript:;' on:click={() => {
          showModal.set(true)
          showLoginModal.set(false)
          showRegistrationModal.set(true)
        }}>Sign up</a></li>
        <li><a href='javascript:;' on:click={() => {
          showModal.set(true)
          showLoginModal.set(true)
          showRegistrationModal.set(false)
        }}>Log in</a></li>
      {/if}
    </ul>
  </nav>
</div>
