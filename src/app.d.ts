// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
        interface PageState {
            sortBy?: string;
        }

        type MdsvexFile = {
            default: import("svelte").Snippet<[]>;
            metadata: PostMetadata;
        };

        type PostMetadata = {
            title: string;
            date: Date; // format: YYYY-MM-DD
            author: string;
            description: string;
            cover: string;
            tags: string[];
            readingTime: number; // format: seconds
        };

        type BlogPost = {
            slug: string;
            metadata: MdsvexFile["metadata"];
            content: MdsvexFile["default"];
        };
    }
}

export {};
