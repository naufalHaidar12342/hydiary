import { FALLBACK_HYGRAPH_API } from "../constants/apiHygraphConfigs";
import { SelectedEntryResponse } from "../types/diaryEntriesType";


export default async function fetchSelectedEntry(slugFromRoute: string):Promise<SelectedEntryResponse> {
  const entryResponse = await fetch(process.env.HYPERGRAPH_HIPERF_API || FALLBACK_HYGRAPH_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${process.env.HYGRAPH_TOKEN}`
    },
    next: {
      revalidate:100
    },
    body: JSON.stringify({
      query:`query SelectedEntry($slugFromRoute:String!){
        posts(where:{slug_contains: $slugFromRoute}){
          title
          excerpt
          date
          createdAt
          content{
            markdown
          }
          postCategories
          postAttribution{
            attributionMarkdown
            attributionImage{
              url
            }
          }
        }
      }`,
      variables: {
        slugFromRoute
      }
    })
  }).then((res) => res.json()).catch((err) => console.error('Function fetchSelectedEntry returned error. What error exactly? = ', err))
  return entryResponse as SelectedEntryResponse
}
