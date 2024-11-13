<script lang="ts">
    import { page } from "$app/stores";
    import { Calendar, Clock } from "lucide-svelte";

    import { formatReadingTime } from "$lib/utils";
    import Metadata from "$lib/components/layouts/metadata.svelte";
    import DisqusThread from "$lib/components/features/disqus-thread.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<Metadata
    title={data.post.metadata.title}
    description={data.post.metadata.description}
    keywords={data.post.metadata.tags}
    openGraph={{
        title: data.post.metadata.title,
        description: data.post.metadata.description,
        url: $page.url.href,
        site_name: "Blog ─ Yadhst",
        locale: "en_US",
        type: "article",
        image: {
            url: data.post.metadata.cover,
            width: 1200,
            height: 630,
            alt: data.post.metadata.title,
        },
    }}
    twitter={{
        card: "summary_large_image",
        title: data.post.metadata.title,
        description: data.post.metadata.description,
        site: "@yadhst",
        image: {
            url: data.post.metadata.cover,
            width: 1200,
            height: 630,
            alt: data.post.metadata.title,
        },
    }}
/>

<div class="flex flex-col gap-10">
    <div class="h-72 w-full overflow-hidden rounded-lg border border-border">
        <img
            src={data.post.metadata.cover}
            alt="cover"
            class="pointer-events-none size-full object-cover"
        />
    </div>
    <div
        class="flex flex-col gap-3 border-b-2 border-dashed border-border pb-3"
    >
        <h1 class="text-3xl font-extrabold">{data.post.metadata.title}</h1>
        <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5 text-muted-foreground">
                <Calendar class="size-3" />
                <span class="text-xs">
                    {data.post.metadata.date.toDateString()}
                </span>
            </div>
            <div class="flex items-center gap-1.5 text-muted-foreground">
                <Clock class="size-3" />
                <span class="text-xs">
                    {formatReadingTime(data.post.metadata.readingTime)} Reading Time
                </span>
            </div>
        </div>
    </div>
    <div class="prose mx-auto max-w-full dark:prose-invert">
        {@render data.post.content()}
    </div>
    <div class="flex flex-col gap-2.5">
        <span class="text-sm font-semibold text-muted-foreground">Tags:</span>
        <div class="flex flex-wrap items-center gap-3">
            {#each data.post.metadata.tags as tag (tag)}
                <Badge>#{tag}</Badge>
            {/each}
        </div>
    </div>
    <div class="mt-4 flex flex-col">
        <DisqusThread
            shortname="yadh-blog"
            url={$page.url.href}
            identifier={data.post.slug}
            title={data.post.metadata.title}
        />
    </div>
</div>
