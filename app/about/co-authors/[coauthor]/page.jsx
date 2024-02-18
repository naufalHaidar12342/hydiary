import {
	ABOUT_OGIMAGE,
	ABOUT_OGIMAGE_CREDITS,
} from "@/constants/about_ogimage";
import { metadataBaseUrl } from "@/libraries/metadata-base";
import { metadataRobotsRule } from "@/libraries/metadata-robots";
import { notFound } from "next/navigation";

export async function getCoauthorsInfo(coauthorName) {
	if (coauthorName === "devardha") {
		return [
			{
				coauthorAlias: "devardha",
				coauthorName: "Yudhatama Indra Wardhana Setiabudi (2001-2023)",
				coauthorProfileImage:
					"https://avatars.githubusercontent.com/u/59217768?v=4",
				coauthorDescription:
					"devardha was a full-stack developer, a good friend of mine, the mentor who taught me how to use Next.js, Hygraph, and many more tech stack. When the news of his passing being shared in our high school group chat, I didn't believe it. I thought my friend who shared it meant it was for family relatives of devardha. I was wrong. An Islamic funeral being held the next day, July 26 2023. Rest in peace, devardha. ",
				coauthorSocials: {
					githubLink: "https://github.com/devardha",
					instagramLink: "https://www.instagram.com/ardhayudhatama/",
				},
			},
		];
	} else if (coauthorName === "strijunk") {
		return [
			{
				coauthorAlias: "strijunk",
				coauthorName: "Izzul Khaq",
				coauthorProfileImage:
					"https://avatars.githubusercontent.com/u/63136988?v=4",
				coauthorDescription: "strijunk is a UI/UX designer and photographer.",
				coauthorSocials: {
					githubLink: "https://github.com/strijunk",
					instagramLink: "https://www.instagram.com/powrtrait/",
				},
			},
		];
	} else {
		notFound();
	}
}
export async function generateMetadata({ params }) {
	const [fetchedCoauthorsInfo] = await getCoauthorsInfo(params.coauthor);
	const coauthorAlias = fetchedCoauthorsInfo.coauthorAlias;
	const coauthorDescription = fetchedCoauthorsInfo.coauthorDescription;
	return {
		title: `About ${coauthorAlias} | Hydiary`,
		description: `${coauthorDescription}`,
		...metadataBaseUrl,
		...metadataRobotsRule,
		openGraph: {
			title: `About ${coauthorAlias} | Hydiary`,
			description: `Dedicated page about Hydiary co-author, ${coauthorDescription}`,
			images: [
				{
					url: `${ABOUT_OGIMAGE}`,
					width: 1200,
					height: 630,
					alt: `${ABOUT_OGIMAGE_CREDITS}`,
				},
			],
		},
	};
}
export default async function CoAuthors({ params }) {
	return (
		<div className="w-full h-screen isolate z-10">
			<div className="flex flex-col"></div>
		</div>
	);
}
