<script lang="ts" module>
    type DisqusThreadProps = {
        shortname: string;
        identifier: string;
        url: string;
        title: string;
    };

    type DisqusInstance = {
        reset: (opt: Record<string, unknown>) => void;
    };
</script>

<script lang="ts">
    import { onMount } from "svelte";

    let { shortname, identifier, url, title }: DisqusThreadProps = $props();
    const THREAD_ID = "disqus_thread";
    const EMBED_SCRIPT_ID = "dsq-embed-scr";

    onMount(() => {
        function getDisqusConfig() {
            return function () {
                //@ts-ignore
                this.page.url = url;
                //@ts-ignore
                this.page.identifier = identifier;
                //@ts-ignore
                this.page.title = title;
            };
        }

        function removeResources() {
            const disqusResources = window.document.querySelectorAll(
                'link[href*="disquscdn.com/next/embed"], link[href*="disquscdn.com/next/recommendations"], link[href*="disqus.com/next/config.js"], script[src*="disquscdn.com/next/embed"], script[src*="disqus.com/count-data.js"], iframe[title="Disqus"]'
            );

            disqusResources.forEach((el) => el.remove());
        }

        function loadInstance() {
            const DISQUS =
                "DISQUS" in window ? (window.DISQUS as DisqusInstance) : null;

            if (DISQUS && window.document.getElementById(EMBED_SCRIPT_ID)) {
                DISQUS.reset({
                    reload: true,
                    config: getDisqusConfig(),
                });

                return;
            }

            //@ts-ignore
            window.disqus_config = getDisqusConfig();
            //@ts-ignore
            window.disqus_shortname = shortname;

            const script = window.document.createElement("script");
            script.id = EMBED_SCRIPT_ID;
            script.async = true;
            script.src = `https://${shortname}.disqus.com/embed.js`;

            window.document.body.appendChild(script);
            return script;
        }

        function cleanInstance() {
            const script = window.document.getElementById(EMBED_SCRIPT_ID);
            if (script) window.document.body.removeChild(script);

            if ("DISQUS" in window) {
                const DISQUS = window.DISQUS as DisqusInstance;
                if (DISQUS) DISQUS.reset({});

                try {
                    delete window.DISQUS;
                } catch {
                    window.DISQUS = undefined;
                }
            }

            const disqusThread = window.document.getElementById(THREAD_ID);
            if (disqusThread) {
                while (disqusThread.hasChildNodes())
                    disqusThread.removeChild(disqusThread.firstChild!);
            }

            return removeResources();
        }

        loadInstance();
        return () => cleanInstance();
    });
</script>

<div id="disqus_thread" class="![color-scheme:light]"></div>
<noscript>
    Please enable JavaScript to view the <a
        href="https://disqus.com/?ref_noscript"
    >
        comments powered by Disqus.
    </a>
</noscript>
