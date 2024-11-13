import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatReadingTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} Minutes`;
}

export function updateSearchParams(
    searchParams: URLSearchParams,
    key: string,
    value?: string
) {
    if (value?.length) {
        searchParams.set(key, value);
    } else {
        searchParams.delete(key);
    }

    return searchParams.toString();
}
