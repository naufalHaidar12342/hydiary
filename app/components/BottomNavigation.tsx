"use client";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BottomNavigation() {
  const currentPath = usePathname()

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
    <nav aria-label="Mobile navigation" className="fixed bottom-0 right-0 left-0 z-10 flex flex-row justify-center items-center min-h-14 h-max p-4 gap-6 bg-hydiary-primary border-t-2 border-hydiary-secondary shadow-md rounded-sm w-full font-(family-name:--font-ibm-plex-mono) text-2xl font-medium lg:hidden">
      {navigationPaths.map((item) => (
        <div key={item.name} className="flex flex-col items-end gap-y-2">
          {/* Group the main navigation link with its optional entry-title subsection. */}
          {/* Highlight Entries on its detail routes as well as on the entries index. */}
          <Link
            href={item.address}
            className=" flex flex-col-reverse items-center transition-transform duration-150 hover:translate-x-2"
            aria-current={currentPath === item.address || (item.address === "/entries" && Boolean(entrySlug)) ? "page": undefined}
          >
            {item.name}
            <Bookmark
              aria-hidden="true"
              className={`${currentPath === item.address || (item.address === "/entries" && Boolean(entrySlug)) ? "fill-hydiary-accent text-hydiary-accent" : "flex"} - size-10 transition-all duration-200 ease-in`}
            />
          </Link>
          {/* Render the entry title only on /entries/[slug], truncating long titles visually. */}
          {/*{item.address === "/entries" && entrySlug && entryTitle && (
            <Link
              href={`/entries/${entrySlug}`}
              title={entryTitle}
              className="block w-48 truncate whitespace-nowrap text-right text-lg font-normal transition-transform duration-150 hover:translate-x-2"
            >
              {entryTitle}
            </Link>
          )}*/}
        </div>
      ))}
    </nav>)
}
