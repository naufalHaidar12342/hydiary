import { FALLBACK_HYGRAPH_API } from "../constants/apiHygraphConfigs";
import { DiaryCategory, DiaryEntriesPaginatedResponse } from "../types/diaryEntriesType";

/**
 *
 * @function
 * Perform API request to Hygraph
 * with page limit, entries per page,
 * and categories of entry
 *
 * @param page -- how many page being
 * shown. Default is 1
 *
 * @param limitEntries -- how much entries
 * being shown in ONE (1) page.
 * Default is 2
 *
 * @param entryCategory -- what kind of
 * category we are looking for.
 * Default is string array
 * of all categories=
 * [
   "gaming",
   "mysteries",
   "myStories",
   "programmingTips",
   "randomThoughts",
   "unsolvedQuestions",
   "videoEditingTips"
 ]
 */
export default async function fetchPostsWithPagination({
  page = 1,
  limitEntries = 5,
  entryCategory

}: {
  page?: number;
  limitEntries?: number;
  entryCategory?: DiaryCategory
}): Promise<DiaryEntriesPaginatedResponse> {


  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limitEntries) || limitEntries < 1) {
    throw new Error("`page` and `limitEntries` must be positive integer/number")
  }


  const skip = (page - 1) * limitEntries;

  /**
   * add category filter
   */
  const categoryFilter = entryCategory ? ", where:{postCategories_contains_some: $entryCategory}" : ""

  /**
   * add category variable
   */
  const categoryVariable = entryCategory ? "($entryCategory: [EntryCategories!]!)" : ""

  /**
   * variables prop for hygraph
   */
  const variables = entryCategory ? { entryCategory: [entryCategory] } : {}

  /**
   * connection arguments, for counting
   * how many entries can be returned
   */
  const connectionArguments = entryCategory ? `(where:{postCategories_contains_some: $entryCategory})` : ""

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
        query: `query DiaryEntriesWithPagination
          ${categoryVariable}
        {
          posts(
            first: ${limitEntries},
            skip: ${skip},
            orderBy:date_DESC,
            ${categoryFilter}
          ){
            title
            excerpt
            date
            createdAt
            slug
            postCategories
            postAttribution{
              attributionMarkdown
              attributionImage{
                url
              }
            }
          }
          postsConnection${connectionArguments}{
            aggregate{
              count
            }
          }
        }`,
        variables,
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
  console.log(JSON.stringify(postsWithPaginationResponse, null, 2))
  return postsWithPaginationResponse as DiaryEntriesPaginatedResponse;
}
