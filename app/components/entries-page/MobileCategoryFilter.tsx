"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function MobileCategoryFilter() {
  /*
   * Keep each displayed category paired with the query-string slug used to
   * filter entries. The undefined slug represents the unfiltered "Show all"
   * option.
   */
  const listOfCategory = [
    {
      categoryName: "Show all",
      categorySlug: undefined
    },
    {
      categoryName: "Gaming",
      categorySlug: "gaming"
    },
    {
      categoryName: "Random thoughts",
      categorySlug: "random-thoughts"
    },
    {
      categoryName: "Mysteries",
      categorySlug: "mysteries"
    },
    {
      categoryName: "Unsolved questions",
      categorySlug: "unsolved-questions"
    },
    {
      categoryName: "Programming tips",
      categorySlug: "programming-tips"
    },
    {
      categoryName: "Video editing tips",
      categorySlug: "video-editing-tips"
    },
    {
      categoryName: "My stories",
      categorySlug: "my-stories"
    },
  ]

  /*
   * Read the active filter from the URL so the button label and active option
   * stay correct on direct visits, browser navigation, and category changes.
   */
  const pathname = usePathname()
  const categoryParams = useSearchParams()
  const currentCategory = categoryParams.get("category") || undefined

  /*
   * Track whether the options are visible, and derive the button label from
   * the current URL rather than keeping a separate label that could go stale.
   */
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)

  /**
   * logic:
   * from {@linkcode listOfCategory},
   * use Array.find() function to get
   * the first category that matches
   * with current category in URL
   *
   * if categorySlug has a value,
   * compare it with
   * {@linkcode currentCategory}
   *
   * if categorySlug value is undefined
   * (meaning the categoryName must be "Show all"),
   * check if {@linkcode currentCategory} value is
   * also undefined
   *
   * if yes, then condition matches
   *
   */
  const selectedCategory = listOfCategory.find((category) =>
    category.categorySlug
      ? currentCategory === category.categorySlug
      : !currentCategory
  )

  /**
   * This is the text shown
   * as label, inside the <button> tag
   *
   * logic:
   * using ternary operator,
   * check if {@linkcode selectedCategory},
   * exist.
   *
   * if yes, use its categoryName
   * as the button label
   *
   * if {@linkcode selectedCategory} is undefined,
   * (no category matched with the list),
   * use the text "Show all" as fallback
   */
  const categoryLabelSelected = selectedCategory?.categoryName ?? "Show all"

  return (
    /*
     * The dropdown is limited to widths below the desktop breakpoint.
     * Escape closes it when focus is on the button or one of its links.
     */
    <div
      className="relative inline-block mb-4 lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsCategoryFilterOpen(false)
      }}
    >
      {/* Toggle the options and expose the expanded state to assistive technology. */}
      <button
        type="button"
        onClick={() => setIsCategoryFilterOpen((isOpen) => !isOpen)}
        className="inline-flex items-center gap-2 border border-hydiary-secondary min-h-14 p-2"
        aria-expanded={isCategoryFilterOpen}
        aria-controls="mobile-category-options"
      >
        {categoryLabelSelected}
        <ChevronDown
          aria-hidden="true"
          className={`transition-transform ${isCategoryFilterOpen ? "rotate-180" : ""}`}
        />
      </button>
      {/* Render category navigation only while the dropdown is open. */}
      {isCategoryFilterOpen && (
        <ul
          id="mobile-category-options"
          className="absolute right-0 z-15 mt-1 min-w-full bg-hydiary-primary p-1 shadow-md ring-1 ring-hydiary-secondary"
        >
          {listOfCategory.map((category) => {
            /*
             * Build the matching entries URL and mark its option as active
             * only when both the route and category query match.
             *
             * logic:
             * using ternary operator,
             * check if a category has categorySlug
             *
             * if condition is yes/true,
             * href will have the value
             * "/entries?category=[categorySlug]"
             *
             * if condition is false,
             * href will have the value
             * "/entries" . no query parameter
             * will be added
             */
            const href = category.categorySlug
              ? `/entries?category=${category.categorySlug}`
              : "/entries"
            const isActiveCategory =
              pathname === "/entries" &&
              (category.categorySlug
                ? currentCategory === category.categorySlug
                : !currentCategory
              )

            return (
              <li key={category.categorySlug ?? "all"}>
                <Link
                  href={href}
                  scroll={false}
                  onClick={() => setIsCategoryFilterOpen(false)}
                  className={`block whitespace-nowrap min-h-14 px-3 py-2 hover:text-hydiary-accent ${
                    isActiveCategory ? "text-hydiary-accent" : ""
                  }`}
                  aria-current={isActiveCategory ? "page" : undefined}
                >
                  {category.categoryName}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
