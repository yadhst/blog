<script lang="ts">
    import type { HTMLImgAttributes } from "svelte/elements";
    import type { Action } from "svelte/action";

    let { src, ...restProps }: HTMLImgAttributes & { src: string } = $props();
    const lazyImage: Action<HTMLImageElement> = (node) => {
        function showImage() {
            node.style.opacity = "1";
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry.isIntersecting) return;

                node.src = src;
                if (node.complete) {
                    showImage();
                } else {
                    node.addEventListener("load", showImage);
                }
            },
            { root: null, rootMargin: "0px", threshold: 0 }
        );
        observer.observe(node);

        return {
            destroy() {
                node.removeEventListener("load", showImage);
                observer.disconnect();
            },
        };
    };
</script>

<img style="opacity: 0" {...restProps} use:lazyImage />
