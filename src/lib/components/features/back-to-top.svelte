<script lang="ts">
    import { onMount } from "svelte";
    import { ChevronUp } from "lucide-svelte";

    import { cn } from "$lib/utils";
    import { Button } from "$lib/components/ui/button";

    let visible = $state(false);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    onMount(() => {
        function toggleVisibility() {
            const HEADER_OFFSET = 56;
            if (window.scrollY >= HEADER_OFFSET) {
                visible = true;
            } else {
                visible = false;
            }
        }

        toggleVisibility();
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    });
</script>

{#if visible}
    <Button
        aria-label="back to top"
        onclick={scrollToTop}
        class={cn("fixed bottom-8 right-8 z-50")}
    >
        <ChevronUp />
    </Button>
{/if}
