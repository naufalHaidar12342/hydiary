"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function StandingNavigation() {
  const currentPath = usePathname();
  // Match only a single slug segment under /entries, not /entries or deeper nested paths.
  const entrySlug = currentPath.match(/^\/entries\/([^/]+)\/?$/)?.[1];
  // Keep the title in client state because the navigation appears in a client component.
  const [entryTitle, setEntryTitle] = useState<string | null>(null);

  // Load the current entry title whenever navigation enters or leaves an entry detail page.
  useEffect(() => {
    // Hide the subsection on every route that is not /entries/[slug].
    if (!entrySlug) {
      setEntryTitle(null);
      return;
    }

    // Abort any outstanding request if the route changes or this component unmounts.
    const controller = new AbortController();
    setEntryTitle(null);

    // Ask the server endpoint for only the title, keeping the content API call server-side.
    fetch(`/api/entries/${encodeURIComponent(entrySlug)}/title`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        // Treat unsuccessful server responses as errors instead of showing an empty title.
        if (!response.ok) {
          throw new Error(`Could not load entry title: ${response.status}`);
        }

        // Read the title returned by the endpoint and update the subsection.
        const result: { title: string } = await response.json();
        setEntryTitle(result.title);
      })
      .catch((error: unknown) => {
        // Route changes intentionally abort old requests; do not report those as failures.
        if (error instanceof Error && error.name === "AbortError") return;
        // Report real request or response errors so they are not silently hidden.
        console.error("Failed to load the entry title for navigation.", error);
      });

    // Prevent an old route's response from updating the navigation after it changes.
    return () => controller.abort();
  }, [entrySlug]);

  const navigationPaths = [
    {
      name: "Home",
      address: "/",
    },
    {
      name: "Entries",
      address: "/entries",
    },
    {
      name: "About",
      address: "/about",
    },
  ];
  return (
    <nav className="hidden lg:flex flex-col items-end h-[50vh] w-fit px-6 py-4 gap-y-6 font-(family-name:--font-ibm-plex-mono) text-3xl font-medium">
      {navigationPaths.map((item) => (
        <div key={item.name} className="flex flex-col items-end gap-y-2">
          {/* Group the main navigation link with its optional entry-title subsection. */}
          {/* Highlight Entries on its detail routes as well as on the entries index. */}
          <Link
            href={item.address}
            className="flex items-center transition-transform duration-150 hover:translate-x-2"
          >
            {item.name}
            <Bookmark
              className={`${currentPath === item.address || (item.address === "/entries" && Boolean(entrySlug)) ? "text-hydiary-accent" : "flex"} -rotate-90 size-10 transition-all duration-200 ease-in`}
            />
          </Link>
          {/* Render the entry title only on /entries/[slug], truncating long titles visually. */}
          {item.address === "/entries" && entrySlug && entryTitle && (
            <Link
              href={`/entries/${entrySlug}`}
              title={entryTitle}
              className="block w-48 truncate whitespace-nowrap text-right text-lg font-normal transition-transform duration-150 hover:translate-x-2"
            >
              {entryTitle}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
