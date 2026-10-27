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
  postCategories?: string[] | ["My stories"];
  postAttribution: DiaryEntryAttribution;
  author?: DiaryEntryAuthor;
  content?: DiaryEntryContent;
}

/**@type
 * API ID of each category
 * from Hygraph Enumeration
 */
export type DiaryCategory =
  "gaming" |
  "mysteries" |
  "myStories" |
  "programmingTips" |
  "randomThoughts" |
  "unsolvedQuestions" |
  "videoEditingTips"

/**@constant
 * Human-readable label for each category
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

/*
 * Recommended: make the generic represent the item type and always
 * return an array for `posts`. Usage:
 *   DiaryEntryResponse<DiaryEntry>  -> data.posts: DiaryEntry[]
 */

/**
 * @interface .Generic interface that use
 * properties of @interface `DiaryEntry`
 *
 *
 * @property
 * `data` - the wrapper of API contents that will be shown
 *
 * `posts` - Array that returns elements such as
 * `title`, `date`, `slug`, etc.
 *
 * `Complexity-Cost-Left` - the remaining "points" or "token"
 * to perform complex GraphQL request.
 *
 * `Effective-Complexity-Limit` - the hard limit for how complex
 * GraphQL requests are before being refused, if I remember
 */
export interface DiaryEntryResponse<TItem = DiaryEntry> {
  data: {
    posts: TItem[];
  };
  extensions: {
    "Complexity-Cost-Left": number;
    "Effective-Complexity-Limit": number;
  };
}

/* type declaration but specific to each queries */

/**
 * @type
 * Type declaration to dictate elements of array
 * for latest new post
 *
 * @property
 * `title`, `slug`, `date`, `createdAt`, `excerpt`,
 * `postAttribution`
 *
 * @see
 * {@linkcode DiaryEntry} for detailed explanation
 * of each property
 *
 */
export type LatestDiaryEntry = Pick<
  DiaryEntry,
  "title" | "slug" | "date" | "createdAt" | "excerpt" | "postAttribution"
>;

/**
 * @type
 * Type declaration for function
 * that return one (1) latest/newest post
 *
 * @property
 * `title`, `slug`, `date`, `createdAt`,
 * `excerpt`, `postAttribution`, `tags`
 *
 * @see {@linkcode DiaryEntry} for
 * more detailed explanation of each
 * property
 */
export type LatestDiaryEntryResponse = DiaryEntryResponse<LatestDiaryEntry>;

/**
 * @type
 * Type declaration for paginated post query
 *
 * @property
 * `title`, `excerpt`, `date`, `createdAt`,
 * `slug`, `coverImage`, `postAttribution`,
 * `tags`
 *
 * @see {@linkcode DiaryEntry}
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

export type DiaryEntriesPaginatedResponse =
  DiaryEntryResponse<DiaryEntriesPaginated>;
