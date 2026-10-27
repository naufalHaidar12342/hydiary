import Image from "next/image";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import fetchOneLatestPost from "../utilities/api/fetchOneLatestPost";
import convertIsoDateToHumanDate from "../helpers/isodate-to-humandate-converter";
import { DateTime } from "luxon";
import { StickyNotes } from "lucide-react";
import { DuctTapeVisualEffect } from "../components/duct-tape-visual";

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  /**@var
   * store array of latest entry
  */
  const latestEntry = await fetchOneLatestPost()

  /**@summary
   * grabbing members of array
   * only for the required parts
    */
  const entryContent = latestEntry.data.posts.at(0)
  const entryTitle = entryContent?.title || "If this text shows, that mean we got empty array as response from API. So, no entry title here, sadly"
  const entryCreatedDate = entryContent?.createdAt || `2026-09-18T00:00:00+07:00` //18 September 2026, for fallback date
  const entryImage = entryContent?.postAttribution
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: "All Entries",
    description: `About 6 entries each page. Can be filtered with specific genre of entries. Latest entry is "${entryTitle}", written at ${convertIsoDateToHumanDate(entryCreatedDate)}`,
    openGraph: {
      title: "All Entries",
      description: `About 6 entries each page. Can be filtered with specific genre of entries. Latest entry is "${entryTitle}, written at ${convertIsoDateToHumanDate(entryCreatedDate)}"`,
      url: "https://hydiary.my.id/entries",
      images: [
        ...previousImages,
        {
          url: `${entryImage?.attributionImage.url}`,
          alt: `${entryImage?.attributionMarkdown}`,
          width: 1200,
          height: 630,
          type: "picture"
        }
      ]
    }
  }
  // export async function getLatestEntry() {
  //   const latestPost = await fetch(process.env.HYGRAPH_HIPERF_API, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     cache: "no-cache",
  //     body: JSON.stringify({
  //       query: `query LatestPost{
  // 				posts(orderBy: date_DESC, first:1) {
  // 					title
  // 					slug
  // 					date
  // 					createdAt
  // 					excerpt
  // 					postAttribution{
  // 						attributionMarkdown
  // 						attributionImage{
  // 							url
  // 						}
  // 					}
  // 				}
  // 			}`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .catch((errors) => console.error(errors));
  //   return latestPost.data.posts;
  // }
  // export async function getEntries(page = 1, limitContent = 2) {
  //   const skip = (page - 1) * limitContent;
  //   const fetchStories = await fetch(process.env.HYGRAPH_HIPERF_API, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     next: { revalidate: 120 },
  //     body: JSON.stringify({
  //       query: `query StoriesWithPagination{
  // 				posts(first: ${limitContent}, skip: ${skip}, orderBy: date_DESC) {
  // 					title
  // 					excerpt
  // 					date
  // 					createdAt
  // 					slug
  // 					coverImage {
  // 						url
  // 					}
  // 					postAttribution {
  // 						attributionMarkdown
  // 						attributionImage {
  // 							url
  // 						}
  // 					}
  // 					tags
  // 				}
  // 			}`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .catch((err) => console.error(err));
  //   return fetchStories.data.posts;
  // }
}

export default async function AllEntry({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  // const page =
  //   typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  // const limit =
  //   typeof searchParams.limit === "string" ? Number(searchParams.limit) : 2;
  // // const searchTitle=
  // 	typeof searchParams.search === "string" ? searchParams.search : undefined;

  /* stories and heroImages are fetched in parallel, each will have array value.
  also benefit us since this technique will reduce waterfall */
  // const [entries, heroItems] = await Promise.all([
  //   getEntries(page, limit),
  //   getEntries(1, 3),
  // ]);
  // console.log("isi heroItems", heroItems);
  return (
    <div className="w-full h-full flex flex-col">
      <section>
        <h2 className="font-(family-name:--font-ibm-plex-mono) font-bold text-4xl text-hydiary-accent">
          Categories
        </h2>
        
      </section>
      <DuctTapeVisualEffect className="h-40 w-120 text-hydiary-secondary rotate-4" />
      <DuctTapeVisualEffect className="h-24 text-hydiary-secondary -rotate-4" />
      <p>frfrfrfr</p>
    </div>
  );
}
