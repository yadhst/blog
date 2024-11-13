<script lang="ts">
    import Layout from "$lib/components/layouts/layout.svelte";

    let { children } = $props();
</script>

<Layout class="max-w-3xl">
    <div class="mt-10 flex-1">
        {@render children()}
    </div>
</Layout>
