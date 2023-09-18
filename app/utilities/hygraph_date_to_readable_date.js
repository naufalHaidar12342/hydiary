import { DateTime } from "luxon";

export default function HygraphDateToReadableDate(hygraphDate) {
	const formattedDate = DateTime.fromISO(hygraphDate)
		.setZone("Asia/Jakarta")
		.toFormat("MMMM dd, yyyy ");
	return formattedDate;
}
