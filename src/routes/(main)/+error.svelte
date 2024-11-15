<script>
    import { page } from "$app/stores";

    import LazyImage from "$lib/components/elements/lazy-image.svelte";
</script>

<LazyImage
    src="https://http.cat/{$page.status}.jpg"
    alt="error {$page.status}"
    class="pointer-events-none size-full rounded-md object-cover"
/>
