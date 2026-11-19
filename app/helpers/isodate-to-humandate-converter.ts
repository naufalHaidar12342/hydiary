import { DateTime } from "luxon";

export default function convertIsoDateToHumanDate(isoDate: string): string {
  // Reject empty or non-string values instead of continuing with an invalid date.
  if (typeof isoDate !== "string" || isoDate.trim() === "") {
    throw new TypeError("isoDate must be a non-empty string.");
  }

  // Interpret timestamps without an offset as Jakarta time and convert offset-aware
  // timestamps into Jakarta time, which is UTC+7.
  const date = DateTime.fromISO(isoDate.trim(), { zone: "Asia/Jakarta" });

  // Stop on invalid ISO input so callers cannot mistake an invalid-date string for a result.
  if (!date.isValid) {
    throw new Error(`Invalid ISO date: ${isoDate}`);
  }

  // Keep the month name in English and display day, full month, year, and 24-hour time.
  return date.toFormat("dd MMMM yyyy, HH:mm '(UTC+7) Asia/Jakarta'", { locale: "en" });
}
