<script>
    export let id;
    export let picture;
    export let type;
    export let town;
    export let title;
    export let rating;
    export let reviewsCount;
    export let superhost;
</script>

<div>
    <a href="/houses/{id}">
        <img src="{picture}" width="100%" style="" alt="" />
        <p>{type} - {town}</p>
        <p>{title}</p>
        <p>{rating} ({reviewsCount}) {superhost ? '- Superhost' : ''}</p>
    </a>
</div>

