import { DateTime } from "luxon";
/* Hygraph always return date in ISO 8601 format. 
for example, 2024-01-23T03:57:25Z , this will be
converted to January 23, 2024  */
export default function HygraphDateToReadableDate(hygraphDate) {
	const formattedDate = DateTime.fromISO(hygraphDate)
		.setZone("Asia/Jakarta")
		.toFormat("MMMM dd, yyyy ");
	return formattedDate;
}
