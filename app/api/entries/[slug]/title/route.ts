import fetchSelectedEntry from "@/app/utilities/api/fetchSelectedEntry";
import { NextResponse } from "next/server";

// Expose the selected entry's title to client-side navigation without exposing API credentials.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  // Next.js provides dynamic route parameters asynchronously.
  const { slug } = await params;

  // Reject malformed paths before sending a request to the content API.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "Invalid entry slug." }, { status: 400 });
  }

  // Reuse the existing server-side query helper to retrieve this entry.
  const entry = await fetchSelectedEntry(slug);

  // The helper may return no response when the content API request fails.
  if (!entry) {
    return NextResponse.json(
      { error: "Could not load entry." },
      { status: 502 },
    );
  }

  // Return a not-found response when the query did not find an entry with this slug.
  const title = entry.data.posts[0]?.title;
  if (!title) {
    return NextResponse.json({ error: "Entry not found." }, { status: 404 });
  }

  // Send only the field required by the navigation subsection.
  return NextResponse.json({ title });
}
