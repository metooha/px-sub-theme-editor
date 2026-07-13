import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves a root-relative public asset path (e.g. "/assets/foo.png") against
 * the app's base URL. Needed because this app is deployed to a subpath on
 * GitHub Pages (e.g. "/px-sub-theme-editor/"), so a hardcoded "/assets/..."
 * string resolves to the wrong (domain-root) URL in production even though
 * it works fine in local dev, where the base is "/".
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}
