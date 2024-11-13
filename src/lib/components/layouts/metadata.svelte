<script lang="ts" module>
    type ImageData = {
        width: number;
        height: number;
        url: string;
        alt: string;
    };

    type MetadataProps = {
        title: string;
        description: string;
        keywords: string[];
        author?: { name: string; url: string };
        openGraph?: {
            title: string;
            description: string;
            url: string;
            site_name: string;
            locale: string;
            type: string;
            image: ImageData;
        };
        twitter?: {
            card: string;
            title: string;
            description: string;
            site: string;
            image: ImageData;
        };
    };
</script>

<script lang="ts">
    let {
        title,
        description,
        keywords,
        author,
        openGraph,
        twitter,
    }: MetadataProps = $props();
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords.join(",")} />

    {#if author}
        <meta name="author" content={author.name} />
        <link rel="author" href={author.url} />
    {/if}

    {#if openGraph}
        <meta property="og:title" content={openGraph.title} />
        <meta property="og:description" content={openGraph.description} />
        <meta property="og:url" content={openGraph.url} />
        <meta property="og:site_name" content={openGraph.site_name} />
        <meta property="og:locale" content={openGraph.locale} />
        <meta property="og:type" content={openGraph.type} />
        <meta property="og:image" content={openGraph.image.url} />
        <meta property="og:image:alt" content={openGraph.image.alt} />
        <meta
            property="og:image:width"
            content={openGraph.image.width.toString()}
        />
        <meta
            property="og:image:height"
            content={openGraph.image.height.toString()}
        />
    {/if}

    {#if twitter}
        <meta name="twitter:card" content={twitter.card} />
        <meta name="twitter:title" content={twitter.title} />
        <meta name="twitter:description" content={twitter.description} />
        <meta name="twitter:site" content={twitter.site} />
        <meta name="twitter:image" content={twitter.image.url} />
        <meta name="twitter:image:alt" content={twitter.image.alt} />
        <meta
            name="twitter:image:width"
            content={twitter.image.width.toString()}
        />
        <meta
            name="twitter:image:height"
            content={twitter.image.height.toString()}
        />
    {/if}
</svelte:head>
