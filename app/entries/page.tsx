import { Metadata, ResolvingMetadata } from "next";
import fetchOneLatestPost from "../utilities/api/fetchOneLatestPost";
import convertIsoDateToHumanDate from "../helpers/isodate-to-humandate-converter";
import { Suspense } from "react";
import { categoryFromSlug } from "../utilities/types/categoriesValidation";
import CategoryChoices from "../components/entries-page/CategoryChoices";
import fetchPostsWithPagination from "../utilities/api/fetchPostsWithPagination";
import Image from "next/image";
import Link from "next/link";
import { CategoryLabels } from "../utilities/types/diaryEntriesType";

/**
 * Build this page's title, description, and social-sharing preview.
 * Next.js calls this function while preparing the page metadata.
 */
export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  // Fetch the newest diary entry so the page description can mention it.
  const latestEntry = await fetchOneLatestPost()

  // Use the first result as the latest entry; `.at(0)` returns undefined if none exist.
  const entryContent = latestEntry.data.posts.at(0)

  // Keep the page metadata usable even if the latest-entry query returned no post.
  const entryTitle = entryContent?.title || "If this text shows, that mean we got empty array as response from API. So, no entry title here, sadly"
  const entryCreatedDate = entryContent?.createdAt || `2026-09-18T00:00:00+07:00` //18 September 2026, for fallback date

  // The attribution image is used as the page's social-sharing preview image.
  const entryImage = entryContent?.postAttribution

  // Preserve any Open Graph images already supplied by a parent layout.
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

/**
 * Render the entry listing. Search parameters determine the category filter
 * and which slice of matching entries should be displayed.
 */
export default async function AllEntry({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  /**
   * Await Next.js's query-string values. For example, the URL
   * `/entries?category=my-stories&page=2` supplies both values here.
   */
  const params = await searchParams

  /**
   * Read the category query parameter. It can be absent, appear once as a
   * string, or appear multiple times as an array. This page uses its first
   * value if the parameter was repeated.
   */
  const rawCategory = Array.isArray(params.category) ? params.category[0] : params.category

  /**
   * Missing category and the special "all" option both mean no category
   * filter. Otherwise, translate a URL slug such as "my-stories" into its
   * Hygraph ID, "myStories". Unknown slugs become undefined as well.
   */
  const category = rawCategory && rawCategory !== "all" ? categoryFromSlug(rawCategory) : undefined

  /**
   * Read the requested page number using the same single-value rule.
   * This remains the raw URL string (or undefined); validate and convert it
   * to a positive number before using it in a paginated query.
   */
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page

  const parsedPage = Number(rawPage)
  // Use page 1 if the URL page value is missing, invalid, or less than 1.
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1

  // Fetch the requested page of entries, filtered when a valid category was selected.
  const entriesResponse = await fetchPostsWithPagination({ page, entryCategory: category })

  // The count uses the same category filter as the entries query. Divide by the
  // five entries per page and round up so a partially filled final page counts.
  const totalPages = Math.ceil(entriesResponse.data.postsConnection.aggregate.count / 5)

  // Keep the URL's category slug in page links so pagination doesn't clear the filter.
  const categoryQuery = category && rawCategory ? `&category=${encodeURIComponent(rawCategory)}` : ""

  // Create a URL for a target page, preserving the selected category if present.
  const pageHref = (targetPage: number) => `entries?page=${targetPage}${categoryQuery}`
  return (
    <div className="w-full h-full flex flex-col">
      <section className="flex flex-col">
        <h2 className="font-(family-name:--font-ibm-plex-mono) font-bold text-4xl text-hydiary-accent mb-5">
          Categories
        </h2>
      </section>
      <Suspense fallback={<div>Loading all categories, please wait...</div>}>
        <CategoryChoices />
      </Suspense>

      <section className="flex flex-col">
        <Suspense fallback={
          <div>Opening entries that should be shown here, please wait...</div>
        }>
          <div className="grid lg:grid-cols-3 gap-4">
            {entriesResponse.data.posts.length === 0 ? (
              <p className="col-span-full py-8 text-center">
                Looks like I have not written anything in this category yet.
                Maybe other category has something interesting?
              </p>
            ) : (
              /* Render one image-and-title card for each entry returned by Hygraph. */
              entriesResponse.data.posts.map((diaryEntry) => (
                <div key={diaryEntry.slug} className="h-full w-full flex flex-col">
                  <section className="h-40 w-full relative">
                    <Image
                      src={`${diaryEntry.postAttribution.attributionImage.url}`}
                      alt={`${diaryEntry.postAttribution.attributionMarkdown}`}
                      style={{ objectFit: "cover" }}
                      fill
                      sizes="(max-width:768px)75vw, 100vw"
                    />
                  </section>
                  <section>
                    <span>{diaryEntry.title}</span>
                    <ul>
                      {diaryEntry.postCategories?.map((entryCategory) => (
                        // The Hygraph category ID is the key in CategoryLabels;
                        // indexing with it returns the visitor-friendly label.
                        <li key={entryCategory}>{CategoryLabels[entryCategory]}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              ))
            )}
          </div>
        </Suspense>
      </section>

      {/* In JSX, `condition && <Element />` renders the element only when
          the condition is true. So this nav appears only when there is more
          than one page. Its links change the page query while retaining the
          selected category, and the text shows visitors where they are. */}
      {totalPages > 1 && (
        <nav aria-label="Entry pages" className="flex items-center justify-center gap-4 py-6">
          {/* `page > 1 && <Link />` shows Previous only after page 1, preventing
              navigation to page 0. */}
          {page > 1 && <Link href={pageHref(page - 1)}>Previous</Link>}
          <span>Page {page} of {totalPages}</span>
          {/* `page < totalPages && <Link />` shows Next only before the last
              page, preventing navigation beyond the available results. */}
          {page < totalPages && <Link href={pageHref(page + 1)}>Next</Link>}
        </nav>
      )}
    </div>
  );
}
