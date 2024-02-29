import { DateTime } from "luxon";

export default function ISOTimeToHumanReadable(ISOtime) {
	const formattedDate = DateTime.fromISO(ISOtime)
		.setZone("Asia/Jakarta")
		.toFormat("MMMM dd, yyyy 'at' HH:mm, '(Jakarta time)'");
	return formattedDate;
}
