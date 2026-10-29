/**
 * @interface
 * Interface declaration for diary entry.
 * Each query can have different property
 * or elements from this interface,
 * depending on the need of query
 *
 * (**Optional**) means that each query
 * might not request the specific element.
 *
 * for example, {@link LatestDiaryEntryResponse}
 * did not request for `author`, but other
 * query request for `author`
 *
 * @property
 * `title` -- name of the post.
 * return as `string`.
 *
 * `slug` -- title of the post,
 * but in lower case and
 * written in kebab case naming system.
 * returns as `string`.
 *
 * `date` -- date in YYYY-mm-dd format.
 * indicating the release date of
 * the post. returns as `string`.
 *
 * `createdAt` -- Hygraph auto-generated
 * date (ISO 8601) when a post/entry
 * is created. return as `string`
 *
 * `excerpt` -- short sentences
 * to explain a little bit about
 * the post. returns as `string`
 *
 *
 * `postCategories` -- (**Optional**).
 * category for a post.
 * one (1) post can have more
 * than one category.
 * default value is "My stories" * (`["My stories"]`).
 *
 * `attributionMarkdown` is
 * planned to be replaced with
 * regular text field instead of
 * markdown field.
 *
 * as for the URL to actual image,
 * it is planned to have same
 * format as `attributionImage.url`
 *
 *
 * `author` -- (**Optional**).
 * writer for the post. as of now,
 * its just me (naufalHaidar)
 *
 * including:
 * writer name `name`,
 * return as `string`
 *
 * profile picture `image.url`,
 * return as `string`
 *
 * `content` -- body of the post.
 * using markdown field (`markdown`)
 * to format the post.
 *
 * @example
 * `title` -- "Lorem Ipsum 2018"
 *
 * `slug` -- "lorem-ipsum-2018"
 *
 * `date` -- "2024-03-23"
 *
 * `createdAt` -- "2024-03-22T18:27:11.65822+00:00"
 *
 * `excerpt` -- "These are the screenshots I took during Arknights 4th Anniversary. I assume these artists have to manually draw on the event's \"post cards\", most likely using their drawing tablet."
 *
 * `postCategories` -- ["myStories", "gaming"]
 *
 *
 * `postAttribution` --
 * "attributionMarkdown": "Wallpaper by [Official Website of Deep Rock Galactic](https://www.deeprockgalactic.com/wallpapers/keoo55ri5k01xlufnj4dxkh1iyb26h)",
 * "attributionImage": {
 *    "url": "https://ap-southeast-2.graphassets.com/AnOOT8xyMQSqFEzJHOhwdz/ojjriFNwTJuFmTdnejnM"
 * }
 *
 * `author` --
 * "name": "Naufal Haidar Rauf",
 * "picture": {
 * "url": "https://ap-southeast-2.graphassets.com/AnOOT8xyMQSqFEzJHOhwdz/IBMqDrET4NQ7MI2KiPhw"
 * }
 *
 * `content` --
 * "markdown": "lorem ipsum dolor sit amet\n\n"
 *
 */
export interface DiaryEntry {
  title: string;
  slug: string;
  date: string;
  createdAt: string;
  excerpt: string;
  postCategories?: DiaryCategory[]
  postAttribution: DiaryEntryAttribution;
  author?: DiaryEntryAuthor;
  content?: DiaryEntryContent;
}

/**
 * The category IDs returned by Hygraph. These values are also used as keys
 * in CategoryLabels to look up the labels displayed to visitors.
 */
export type DiaryCategory =
  "gaming" |
  "mysteries" |
  "myStories" |
  "programmingTips" |
  "randomThoughts" |
  "unsolvedQuestions" |
  "videoEditingTips"

/**
 * Map each Hygraph category ID to its visitor-facing label. Record ensures
 * that every DiaryCategory has a label.
 *
 * @example
 * gaming -> Gaming
 * myStories -> My stories
 */
export const CategoryLabels: Record<DiaryCategory, string> = {
  gaming: "Gaming",
  mysteries: "Mysteries",
  myStories: "My stories",
  programmingTips: "Programming tips",
  randomThoughts: "Random thoughts",
  unsolvedQuestions: "Unsolved questions",
  videoEditingTips: "Video editing tips"
}

/**
 * Placeholder for a future type that may connect URL category parameters,
 * Hygraph category IDs, and display labels. It is currently unused.
 */
export type CategoryGrouping = {}


/**
 * @interface
 * Interface for `postAttribution` property
 * in Hygraph API response
 *
 * @property
 *
 * `attributionMarkdown` - Where the photo/image
 * come from and to whom should we give the credits.
 *
 * `attributionImage` - schema name
 * `url` - The Hygraph Assets link for the image/photo
 */
export interface DiaryEntryAttribution {
  attributionMarkdown: string;
  attributionImage: {
    url: string;
  };
}

/**
 * @interface
 * Interface declaration for the body of post
 *
 * @prop
 * `markdown` - body of the post/content
 * that is formatted in Markdown. returned as `string`
 */
export interface DiaryEntryContent {
  markdown: string;
}

/**
 * @interface
 * Declaring the structure for author
 *
 * @property
 * `name`, `picture.url`
 */
export interface DiaryEntryAuthor {
  name?: string | null;
  picture: {
    url?: string | null;
  };
}

/**
 * Common shape of a Hygraph response containing posts. `TItem` describes
 * which fields each post has, allowing different queries to use narrower
 * post types (for example, DiaryEntryResponse<LatestDiaryEntry>).
 */
export interface DiaryEntryResponse<TItem = DiaryEntry> {
  /** The query result, including the list of requested posts. */
  data: {
    posts: TItem[];
  };
  /** Hygraph query-complexity information returned alongside the data. */
  extensions: {
    "Complexity-Cost-Left": number;
    "Effective-Complexity-Limit": number;
  };
}

/**
 * Only the fields requested by the latest-entry query, selected from the
 * full DiaryEntry shape.
 */
export type LatestDiaryEntry = Pick<
  DiaryEntry,
  "title" | "slug" | "date" | "createdAt" | "excerpt" | "postAttribution"
>;

/** Response type for the query that fetches the latest diary entry. */
export type LatestDiaryEntryResponse = DiaryEntryResponse<LatestDiaryEntry>;

/**
 * Only the fields requested for each post in the paginated entries query.
 */
export type DiaryEntriesPaginated = Pick<
  DiaryEntry,
  | "title"
  | "slug"
  | "createdAt"
  | "date"
  | "postCategories"
  | "excerpt"
  | "postAttribution"
>;

/**
 * Response shape for the paginated query. `postsConnection.aggregate.count`
 * is the total number of matching entries (before pagination), used to
 * calculate how many result pages are available.
 */
export type DiaryEntriesPaginatedResponse = Omit<
  DiaryEntryResponse<DiaryEntriesPaginated>, "data"> & {
    data: {
      posts: DiaryEntriesPaginated[]
      postsConnection: {
        aggregate: {
          count: number
        }
      }
    }
  };
