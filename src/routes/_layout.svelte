<script>
    import Nav from '../components/Nav.svelte';
    import Modal from '../components/Modal.svelte'
    import LoginModal from '../components/LoginModal.svelte'
    import RegistrationModal from '../components/RegistrationModal.svelte'

    export let segment;
    let showModal = true
    let showLoginModal = true
    let showRegistrationModal = false
</script>

<style>
    main {
        position: relative;
        max-width: 56em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>

<Nav {segment}/>

<main>
    <slot></slot>
</main>

{#if showModal}
    <Modal on:close={() => showModal = false}>
        {#if showLoginModal}
            <LoginModal on:showSignup={() => {
            showLoginModal = false
            showRegistrationModal = true
            }}></LoginModal>
        {/if}
        {#if showRegistrationModal}
            <RegistrationModal on:showLogin={() => {
            showLoginModal = true
            showRegistrationModal = false
            }}></RegistrationModal>
        {/if}
    </Modal>
{/if}
