import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    try {
        const mod = (await import(
            `$lib/posts/${params.slug}.svx`
        )) as App.MdsvexFile;

        const post: App.BlogPost = {
            slug: params.slug,
            metadata: { ...mod.metadata, date: new Date(mod.metadata.date) },
            content: mod.default,
        };

        return { post };
    } catch {
        error(404, "Post not found");
    }
};
