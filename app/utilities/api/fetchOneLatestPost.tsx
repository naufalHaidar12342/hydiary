import { FALLBACK_HYGRAPH_API } from "../constants/apiHygraphConfigs";
import {
  DiaryEntryResponse,
  LatestDiaryEntryResponse,
} from "../types/diaryEntriesType";

/**
 * @async
 * Async function to fetch one (1) newest/latest post
 * from Hygraph. Only "Published" status will be
 * returned.
 *
 * @
 *
 * @returns
 * string array using LatestDiaryEntryResponse type
 *
 * @see
 * {@link LatestDiaryEntryResponse} for detailed
 * description of each property
 */

export default async function fetchOneLatestPost(): Promise<LatestDiaryEntryResponse> {
  const latestPostResponse = await fetch(
    process.env.HYGRAPH_HIPERF_API || FALLBACK_HYGRAPH_API,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 100,
      },
      body: JSON.stringify({
        query: `query LatestPost{
          posts(orderBy: date_DESC, first:1) {
            title
            slug
            date
            createdAt
            excerpt
            postAttribution{
              attributionMarkdown
              attributionImage{
                url
              }
            }
          }
        }`,
      }),
    },
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return latestPostResponse as LatestDiaryEntryResponse;
}
