<script lang="ts"></script>

{#snippet navigation(link: string, label: string, isBlank?: boolean)}
    <a
        href={link}
        aria-label={label}
        target={isBlank ? "_blank" : undefined}
        class="font-bold transition-colors duration-150 hover:text-indigo-500"
    >
        {label}
    </a>
{/snippet}

<div class="flex items-center gap-1">
    <div class="ml-auto flex gap-3">
        {@render navigation("https://yadh.vercel.app/", "My Portfolio", true)}
        {@render navigation("/", "Blogs")}
    </div>
</div>
