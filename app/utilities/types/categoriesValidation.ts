import { CategoryLabels, DiaryCategory } from "./diaryEntriesType";

/**
 * Check whether an unknown value is a known Hygraph category ID.
 * The type predicate lets TypeScript treat valid values as DiaryCategory.
 */
function isDiaryCategory(value: unknown): value is DiaryCategory {
  return typeof value === "string" && Object.hasOwn(CategoryLabels, value)
}

/**
 * Keep only valid category IDs from an unknown input. Non-arrays produce an
 * empty list; invalid items in an array are filtered out.
 */
export function getValidCategories(value: unknown): DiaryCategory[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value.filter(isDiaryCategory)
}

/**
 * One source of truth mapping each Hygraph category ID to the label shown to
 * visitors and the slug used in category URLs.
 */
export const CategoryGroup = {
  gaming: {
    label: "Gaming",
    slug: "gaming"
  },
  mysteries: {
    label: "Mysteries",
    slug: "mysteries",
  },
  myStories: {
    label: "My stories",
    slug: "my-stories",
  },
  programmingTips: {
    label: "Programming tips",
    slug: "programming-tips",
  },
  randomThoughts: {
    label: "Random thoughts",
    slug: "random-thoughts",
  },
  unsolvedQuestions: {
    label: "Unsolved questions",
    slug: "unsolved-questions",
  },
  videoEditingTips: {
    label: "Video editing tips",
    slug: "video-editing-tips",
  },
} as const

/**
 * The valid Hygraph category IDs, derived from the keys of CategoryGroup so
 * this type stays aligned with the category mapping.
 */
export type EntryCategory = keyof typeof CategoryGroup

/**
 * Union of the visitor-facing category labels, derived from CategoryGroup.
 */
export type CategoryLabel = (typeof CategoryGroup)[EntryCategory]["label"]

/**
 * Reverse lookup from URL slug to Hygraph category ID. `satisfies` checks
 * that every slug declared in CategoryGroup is represented with a valid ID.
 */
const categoryBySlug = {
  gaming: "gaming",
  mysteries: "mysteries",
  "my-stories": "myStories",
  "programming-tips": "programmingTips",
  "random-thoughts": "randomThoughts",
  "unsolved-questions": "unsolvedQuestions",
  "video-editing-tips": "videoEditingTips",
} as const satisfies Record<(typeof CategoryGroup)[keyof typeof CategoryGroup]["slug"], keyof typeof CategoryGroup>

/**
 * The valid category URL slugs, derived from the categoryBySlug keys.
 */
export type CategorySlug = (keyof typeof categoryBySlug)

/** Return whether a string is one of the known category URL slugs. */
export function isCategorySlug(value: string): value is CategorySlug {
  return Object.hasOwn(categoryBySlug, value)
}

/** Return whether a string is one of the known Hygraph category IDs. */
export function isEntryCategory(value: string): value is EntryCategory {
  return Object.hasOwn(CategoryGroup, value)
}

/**
 * Convert a URL slug, such as "my-stories", to its Hygraph ID, "myStories".
 * Return undefined when the supplied slug is not recognized.
 */
export function categoryFromSlug(value: string): DiaryCategory | undefined {
  return isCategorySlug(value) ? categoryBySlug[value] : undefined
}
