<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { useDebounce } from "runed";
    import {
        Star,
        Calendar,
        Eye,
        // ChevronLeft,
        // ChevronRight,
        ClockArrowUp,
        ClockArrowDown,
        ArrowUpAZ,
        // ArrowUp10,
    } from "lucide-svelte";

    import { updateSearchParams } from "$lib/utils";
    import BlogCard from "$lib/components/cards/blog-card.svelte";
    import TagsFilter from "$lib/components/features/tags-filter.svelte";
    import PostsPagination from "$lib/components/features/posts-pagination.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Input } from "$lib/components/ui/input";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
    let featuredPost = data.featuredPosts[0];
    let sortBy = $derived($page.url.searchParams.get("sortBy"));
    let searchQuery = $derived($page.url.searchParams.get("q"));

    const goParams = (k: string, v: string) => {
        const url = new URL($page.url);
        const searchParams = updateSearchParams(url.searchParams, k, v);

        return goto(`?${searchParams}`, { noScroll: true, keepFocus: true });
    };

    const debouncedSearch = useDebounce((value: string) => {
        if (!value.length && sortBy === "relevance") {
            $page.url.searchParams.delete("sortBy");
        }

        return goParams("q", value);
    }, 800);

    function filterTags(tags: string[]) {
        return goParams("tags", tags.join(","));
    }

    function orderBy(order: "oldest" | "newest" | "relevance") {
        return goParams("sortBy", order);
    }

    function goToPage(page: number) {
        return goParams("page", page.toString());
    }
</script>

<div class="flex flex-col gap-10">
    <div class="flex flex-col gap-5">
        <div
            class="relative h-72 w-full overflow-hidden rounded-lg border border-border"
        >
            <div class="pointer-events-none absolute inset-0 z-0">
                <img
                    src={featuredPost.metadata.cover}
                    alt="cover"
                    class="size-full object-cover brightness-50"
                />
            </div>
            <div class="relative flex size-full flex-col justify-between gap-1">
                <div class="flex items-center px-6 pt-4">
                    <Badge variant="secondary">
                        <Star class="mr-1.5 size-3" />
                        Featured
                    </Badge>
                </div>
                <div
                    class="flex w-full flex-col gap-4 px-6 py-4 text-background dark:text-foreground"
                >
                    <div class="flex flex-col gap-1">
                        <a
                            href="/read/{featuredPost.slug}"
                            aria-label="see-more"
                            class="underline-offset-4 hover:underline"
                        >
                            <h1 class="line-clamp-1 text-3xl font-bold">
                                {featuredPost.metadata.title}
                            </h1>
                        </a>
                        <p class="line-clamp-1 font-medium">
                            {featuredPost.metadata.description}
                        </p>
                        <div class="flex items-center gap-3">
                            <div
                                class="flex items-center gap-1.5 text-muted dark:text-muted-foreground"
                            >
                                <Calendar class="size-3" />
                                <span class="text-xs">
                                    {featuredPost.metadata.date.toDateString()}
                                </span>
                            </div>
                            <div
                                class="flex items-center gap-1.5 text-muted dark:text-muted-foreground"
                            >
                                <Eye class="size-3" />
                                <span class="text-xs">0 views</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="flex items-center gap-3">
                        <Button size="icon" variant="outline">
                            <ChevronLeft class="text-foreground" />
                        </Button>
                        <Button size="icon" variant="outline">
                            <ChevronRight class="text-foreground" />
                        </Button>
                    </div> -->
                </div>
            </div>
        </div>
        <div
            id="controller"
            class="flex flex-col-reverse items-center justify-between gap-3 md:flex-row"
        >
            <div class="flex w-full flex-wrap gap-3 sm:w-auto">
                <Button
                    size="sm"
                    disabled={sortBy === "newest"}
                    onclick={() => orderBy("newest")}
                >
                    <ClockArrowUp />
                    Newest
                </Button>
                <Button
                    size="sm"
                    disabled={sortBy === "oldest"}
                    onclick={() => orderBy("oldest")}
                >
                    <ClockArrowDown />
                    Oldest
                </Button>
                {#if Boolean(searchQuery)}
                    <Button
                        size="sm"
                        disabled={sortBy === "relevance"}
                        onclick={() => orderBy("relevance")}
                    >
                        <ArrowUpAZ />
                        Relevance
                    </Button>
                {/if}
                <!-- <Button size="sm">
                    <ArrowUp10 />
                    Most Viewed
                </Button> -->
                <TagsFilter postTags={data.postTags} onConfirm={filterTags} />
            </div>
            <div class="flex w-full sm:w-1/2 md:w-[35%]">
                <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery || ""}
                    oninputcapture={(e) => {
                        if (
                            e.target &&
                            "value" in e.target &&
                            typeof e.target.value === "string"
                        ) {
                            debouncedSearch(e.target.value);
                        }
                    }}
                />
            </div>
        </div>
    </div>
    {#if data.posts.length > 0}
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {#each data.posts as post (post.slug)}
                <BlogCard
                    {...post.metadata}
                    href="/read/{post.slug}"
                    views={0}
                />
            {/each}
        </div>
        <PostsPagination
            currentPage={Number($page.url.searchParams.get("page")) || 1}
            totalPosts={data.totalPosts}
            onPageChange={goToPage}
        />
    {:else}
        <div class="my-6 flex flex-col items-center gap-1.5">
            <p class="text-muted-foreground">No posts found</p>
            <a
                href="/"
                aria-label="Go to homepage"
                class="font-light underline underline-offset-2"
            >
                Go to homepage
            </a>
        </div>
    {/if}
</div>
