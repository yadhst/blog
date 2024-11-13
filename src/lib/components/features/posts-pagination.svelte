<script lang="ts" module>
    type PostsPaginationProps = {
        currentPage: number;
        totalPosts: number;
        onPageChange?: (page: number) => void;
    };
</script>

<script lang="ts">
    import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
    import ChevronRight from "svelte-radix/ChevronRight.svelte";

    import { POSTS_PER_PAGE } from "$lib/constants";
    import * as Pagination from "$lib/components/ui/pagination/index.js";

    let {
        currentPage: cPage,
        totalPosts,
        onPageChange,
    }: PostsPaginationProps = $props();
</script>

<Pagination.Root
    page={cPage}
    count={totalPosts}
    perPage={POSTS_PER_PAGE}
    onPageChange={(page) => onPageChange?.(page)}
    controlledPage
>
    {#snippet children({ pages, currentPage })}
        <Pagination.Content>
            <Pagination.Item>
                <Pagination.PrevButton>
                    <ChevronLeft class="size-4" />
                    <span class="hidden sm:block">Previous</span>
                </Pagination.PrevButton>
            </Pagination.Item>
            {#each pages as page (page.key)}
                {#if page.type === "ellipsis"}
                    <Pagination.Item>
                        <Pagination.Ellipsis />
                    </Pagination.Item>
                {:else}
                    <Pagination.Item>
                        <Pagination.Link
                            {page}
                            isActive={currentPage === page.value}
                        >
                            {page.value}
                        </Pagination.Link>
                    </Pagination.Item>
                {/if}
            {/each}
            <Pagination.Item>
                <Pagination.NextButton>
                    <span class="hidden sm:block">Next</span>
                    <ChevronRight class="size-4" />
                </Pagination.NextButton>
            </Pagination.Item>
        </Pagination.Content>
    {/snippet}
</Pagination.Root>
