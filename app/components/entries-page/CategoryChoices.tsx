"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"


export default function CategoryChoices() {
  const listOfCategory = [
    {
      categoryName: "Show all",
      categorySlug: "/entries"
    },
    {
      categoryName: "Gaming",
      categorySlug: "/entries?category=gaming"
    },
    {
      categoryName: "Random thoughts",
      categorySlug: "/entries?category=random-thoughts"
    },
    {
      categoryName: "Mysteries",
      categorySlug: "/entries?category=mysteries"
    },
    {
      categoryName: "Unsolved questions",
      categorySlug: "/entries?category=unsolved-questions"
    },
    {
      categoryName: "Programming tips",
      categorySlug: "/entries?category=programming-tips"
    },
    {
      categoryName: "Video editing tips",
      categorySlug: "/entries?category=video-editing-tips"
    },
    {
      categoryName: "My stories",
      categorySlug: "/entries?category=my-stories"
    },
  ]
  const pathname = usePathname()
  const categoryParams = useSearchParams()
  const currentCategory = categoryParams.get("category") || undefined

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {listOfCategory.map((category) => {
        let isActiveCategory = false;
        if (category.categorySlug === "/entries") {
          isActiveCategory = pathname === "/entries" && !currentCategory;
        } else {
          const slugCategoryMatch = category.categorySlug.match(/category=([^&]+)/)
          const slugCategory = slugCategoryMatch ? slugCategoryMatch[1] : undefined;
          isActiveCategory = pathname === "/entries" && currentCategory === slugCategory;
        }
        return (
          <div key={category.categoryName} className="flex flex-col h-18">
            <Link
              href={category.categorySlug}
              key={`"${category.categoryName}"`} scroll={false} className={`flex items-center bg-inherit border border-hydiary-secondary p-1.5 w-fit h-14 transition-all duration-400 hover:h-16 ${isActiveCategory ? "text-hydiary-accent border-hydiary-accent" : ""}`}
              aria-current={isActiveCategory ? "page" : undefined}
            >
              {category.categoryName}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
