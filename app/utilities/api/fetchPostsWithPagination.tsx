import { FALLBACK_HYGRAPH_API } from "../constants/apiHygraphConfigs";
import { DiaryEntriesPaginatedResponse } from "../types/diaryEntriesType";

/**
 *
 * @param page
 */
export default async function fetchPostsWithPagination({
  page = 1,
  limitContent = 2,
}: {
  page?: number;
  limitContent?: number;
}): Promise<DiaryEntriesPaginatedResponse> {
  if (typeof page !== "number" && typeof limitContent !== "number") {
    console.error(
      "❌ page and limitContent must be number. Current page type is: ",
      typeof page,
      ". Current limitContent type is: ",
      typeof limitContent,
    );
    throw new Error(
      "Function fetchPostsWithPagination encounter error: `page` and `limitContent` must have `number` value",
    );
  }
  const skip = (page - 1) * limitContent;
  const postsWithPaginationResponse = await fetch(
    process.env.HYGRAPH_HIPERF_API || FALLBACK_HYGRAPH_API,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 120,
      },
      body: JSON.stringify({
        query: `query DiaryEntriesWithPagination{
          posts(first: ${limitContent}, skip: ${skip}, orderBy:date_DESC){
            title
            excerpt
            date
            createdAt
            slug
            tags
            coverImage{
              url
            }
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
    .catch((err) =>
      console.error(
        "Function fetchPostsWithPagination error. Error message: ",
        err,
      ),
    );
  return postsWithPaginationResponse as DiaryEntriesPaginatedResponse;
}
