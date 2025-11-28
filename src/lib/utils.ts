import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function downloadTextFile(
    content: string,
    filename: string = "file.txt"
) {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = filename;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Optional cleanup (helps avoid memory leaks)
    URL.revokeObjectURL(element.href);
}
