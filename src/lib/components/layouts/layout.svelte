<script lang="ts" module>
    import type { Snippet } from "svelte";

    type LayoutProps = {
        class?: string;
        children: Snippet<[]>;
    };
</script>

<script lang="ts">
    import { cn } from "$lib/utils";
    import Header from "$lib/components/layouts/header.svelte";
    import Footer from "$lib/components/layouts/footer.svelte";

    let { children, class: className }: LayoutProps = $props();
</script>

<div
    class={cn(
        "mx-auto grid min-h-screen max-w-5xl grid-cols-1 grid-rows-[1fr,auto] p-4",
        className
    )}
>
    <div class="flex size-full flex-col py-4">
        <Header />
        <main class="flex size-full min-w-0 flex-1">
            {@render children()}
        </main>
    </div>
    <Footer />
</div>
