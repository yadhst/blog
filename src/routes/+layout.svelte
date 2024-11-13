<script lang="ts">
    import "../app.css";
    import BackToTop from "$lib/components/features/back-to-top.svelte";

    let { children } = $props();
</script>

{@render children()}
<BackToTop />
