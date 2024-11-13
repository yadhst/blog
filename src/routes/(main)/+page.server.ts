import Fuse from "fuse.js";

import { POSTS_PER_PAGE } from "$lib/constants";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const modules = await import.meta.glob("$lib/posts/**/*.{svx,md}");
    const postPromises = Object.entries(modules).map(([path, resolve]) => {
        return resolve().then((mod) => {
            const m = mod as App.MdsvexFile;
            return {
                slug: path
                    .split("/")
                    .at(-1)!
                    .replace(/(.*)\.(?:md|svx)/g, "$1"),
                metadata: { ...m.metadata, date: new Date(m.metadata.date) },
            } as Omit<App.BlogPost, "content">;
        });
    });

    const sortBy = url.searchParams.get("sortBy") ?? "relevance";
    const filterByTags = url.searchParams.get("tags")?.split(",") ?? [];
    const searchQuery = url.searchParams.get("q") ?? "";
    const page = Number(url.searchParams.get("page")) || 1;
    const posts = await Promise.all(postPromises);
    const postTags = Array.from(
        new Set(posts.flatMap((post) => post.metadata.tags))
    );

    // untuk sementara featured post adalah 4 post terbaru
    const featuredPosts = posts
        .toSorted(
            (a, b) => b.metadata.date.getTime() - a.metadata.date.getTime()
        )
        .slice(0, 4);

    const mutatedPosts = posts
        .toSorted((a, b) => {
            if (sortBy === "oldest") {
                return a.metadata.date.getTime() - b.metadata.date.getTime();
            } else {
                return b.metadata.date.getTime() - a.metadata.date.getTime();
            }
        })
        .filter((post) => {
            if (filterByTags.length === 0) return true;
            return filterByTags.some((tag) => post.metadata.tags.includes(tag));
        });

    const fusePosts = new Fuse(mutatedPosts, {
        keys: ["metadata.title", "metadata.description", "metadata.tags"],
        threshold: 0.5,
        shouldSort: sortBy === "relevance",
        includeMatches: true,
    });

    const queriedPosts = searchQuery
        ? fusePosts.search(searchQuery).map((res) => res.item)
        : mutatedPosts;

    const totalPosts = queriedPosts.length;
    const pagedPosts = queriedPosts.slice(
        (page - 1) * POSTS_PER_PAGE,
        page * POSTS_PER_PAGE
    );

    return { posts: pagedPosts, featuredPosts, totalPosts, postTags };
};
