import { isEntryCategory } from "@/app/utilities/types/categoriesValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const categoryValues = new URL(request.url).searchParams.getAll("category")

  // no category means fetch all entries
  // if (categoryValues.length === 0) {
  //   const entries = await fetchEntries()
  // }
}
