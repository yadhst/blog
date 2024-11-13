<script lang="ts" module>
    type TagsFilterProps = {
        postTags: string[];
        onConfirm?: (selectedTags: string[]) => void;
    };
</script>

<script lang="ts">
    import { page } from "$app/stores";
    import { MediaQuery } from "runed";
    import { Filter } from "lucide-svelte";

    import * as Dialog from "$lib/components/ui/dialog";
    import * as Drawer from "$lib/components/ui/drawer";
    import { Button } from "$lib/components/ui/button";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";

    let { postTags, onConfirm }: TagsFilterProps = $props();
    let desktopQuery = new MediaQuery("screen and (min-width: 1024px)");
    let initialSelectedTags =
        $page.url.searchParams.get("tags")?.split(",") ?? [];

    let open = $state(false);
    let selectedTags = $state<string[]>(initialSelectedTags);
    let selectedText = $derived.by(() => {
        let tagText = selectedTags.length > 1 ? "tags" : "tag";
        return `${selectedTags.length} ${tagText} selected`;
    });

    function onApply() {
        onConfirm?.(selectedTags);
        open = false;
    }

    function onClear() {
        selectedTags = [];
        onApply();
    }
</script>

{#snippet trigger({ props }: { props: Record<string, unknown> })}
    <Button size="sm" variant="secondary" {...props}>
        <Filter />
        Tags
    </Button>
{/snippet}

{#snippet items()}
    <div class="flex flex-wrap items-center gap-4">
        {#each postTags as tag (tag)}
            <div class="flex items-center gap-2">
                <Checkbox
                    id={tag}
                    checked={selectedTags.includes(tag)}
                    onclick={(e) => {
                        e.preventDefault();
                        if (selectedTags.includes(tag)) {
                            selectedTags = selectedTags.filter(
                                (t) => t !== tag
                            );
                        } else {
                            selectedTags.push(tag);
                        }
                    }}
                />
                <Label for={tag}>{tag}</Label>
            </div>
        {/each}
    </div>
{/snippet}

{#if desktopQuery.matches}
    <Dialog.Root bind:open>
        <Dialog.Trigger child={trigger} />
        <Dialog.Content class="px-0">
            <Dialog.Header class="px-6">
                <Dialog.Title>Tags</Dialog.Title>
                <Dialog.Description>
                    Filter posts by tags ({selectedText})
                </Dialog.Description>
            </Dialog.Header>
            <div class="max-h-64 w-full overflow-y-auto px-6">
                {@render items()}
            </div>
            <Dialog.Footer class="px-6">
                <Button size="sm" variant="secondary" onclick={onClear}>
                    Clear
                </Button>
                <Button size="sm" onclick={onApply}>Apply</Button>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
{:else}
    <Drawer.Root bind:open>
        <Drawer.Trigger child={trigger} />
        <Drawer.Content>
            <Drawer.Header>
                <Drawer.Title>Tags</Drawer.Title>
                <Drawer.Description>
                    Filter posts by tags ({selectedText})
                </Drawer.Description>
            </Drawer.Header>
            <div class="max-h-64 w-full overflow-y-auto p-4">
                {@render items()}
            </div>
            <Drawer.Footer>
                <Button size="sm" variant="secondary" onclick={onClear}>
                    Clear
                </Button>
                <Button size="sm" onclick={onApply}>Apply</Button>
            </Drawer.Footer>
        </Drawer.Content>
    </Drawer.Root>
{/if}
