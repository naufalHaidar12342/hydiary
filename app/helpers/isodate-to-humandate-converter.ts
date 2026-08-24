import { DateTime } from "luxon";

export default function convertIsoDateToHumanDate(isoDate: string) {
  // make sure the parameter gets non-empty string
  if (typeof isoDate !== "string" || isoDate.trim() === "") {
    console.error(
      "🚀 ~ isoDate must be a non-empty string. ~ isoDate now:",
      isoDate,
    );
  }

  // parse ISO string and keep the timezone infomation
  const isoString = DateTime.fromISO(isoDate, { setZone: true });

  // validate the ISO string
  if (!isoString.isValid) {
    console.error(
      "🚀 ~ isoString ~ Provided string is not a valid ISO 8601. ~isoString now:",
      isoString,
    );
  }

  /* format to Indonesian date */
  const formattedIsoDate = isoString
    .setZone("Asia/Jakarta")
    .toFormat("dd MMMM yyyy, HH:mm '(UTC+7)'");

  return formattedIsoDate;
}
