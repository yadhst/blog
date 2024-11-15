<script lang="ts" module>
    import { Eye, Clock, Calendar } from "lucide-svelte";

    import LazyImage from "$lib/components/elements/lazy-image.svelte";
    import { formatReadingTime } from "$lib/utils";
    import { Badge } from "$lib/components/ui/badge";

    type BlogCardProps = App.PostMetadata & { href: string; views: number };
</script>

<script lang="ts">
    let {
        title,
        description,
        cover,
        href,
        date,
        tags,
        readingTime,
        views,
    }: BlogCardProps = $props();
</script>

<a {href} aria-label={title} class="size-full">
    <div
        class="group relative h-96 w-full overflow-hidden rounded-md border border-border px-4 py-4"
    >
        <div class="pointer-events-none absolute inset-0">
            <LazyImage
                src={cover}
                alt="cover"
                class="size-full object-cover brightness-50 transition-all duration-200 ease-in-out group-hover:rotate-1 group-hover:scale-110 group-hover:blur-sm"
            />
        </div>
        <div class="relative flex size-full flex-col justify-between gap-1.5">
            <div class="flex flex-wrap items-center gap-3">
                {#each tags as tag (tag)}
                    <Badge>#{tag}</Badge>
                {/each}
            </div>
            <div class="flex flex-col gap-4">
                <div
                    class="flex flex-col gap-1 text-background dark:text-foreground"
                >
                    <h1
                        class="line-clamp-2 text-xl font-bold underline-offset-4 group-hover:underline"
                    >
                        {title}
                    </h1>
                    <time
                        datetime={date.toISOString()}
                        class="flex items-center gap-1.5 text-background/70 dark:text-foreground/70"
                    >
                        <Calendar class="size-3" />
                        <span class="text-xs">
                            {date.toDateString()}
                        </span>
                    </time>
                    <p class="line-clamp-3 font-medium">{description}</p>
                </div>
                <div
                    class="flex items-center justify-end gap-3 border-t border-muted-foreground pt-4"
                >
                    <div
                        class="flex items-center gap-1.5 text-background/70 dark:text-foreground/70"
                    >
                        <Eye class="size-3" />
                        <span class="text-xs">{views} views</span>
                    </div>
                    <div
                        class="flex items-center gap-1.5 text-background/70 dark:text-foreground/70"
                    >
                        <Clock class="size-3" />
                        <span class="text-xs">
                            {formatReadingTime(readingTime)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</a>
