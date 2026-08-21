import {
	ABOUT_OGIMAGE,
	ABOUT_OGIMAGE_CREDITS,
} from "@/constants/about_ogimage";
import { metadataBaseUrl } from "@/libraries/metadata-base";
import { metadataRobotsRule } from "@/libraries/metadata-robots";
import { metadataSiteName } from "@/libraries/metadata-sitename";

import Image from "next/image";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import { TfiInstagram } from "react-icons/tfi";

export async function getCoauthorsInfo(coauthorName) {
	if (coauthorName === "devardha") {
		return [
			{
				coauthorAlias: "devardha",
				coauthorName: "Yudhatama Indra Wardhana Setiabudi (2001-2023)",
				coauthorProfileImage:
					"https://avatars.githubusercontent.com/u/59217768",
				coauthorDescription:
					"devardha was a full-stack developer, a good friend of mine, the mentor who taught me how to use Next.js, Hygraph, and many more tech stack. When the news of his passing being shared in our high school group chat, I didn't believe it. I thought my friend who shared it meant it was for family relatives of devardha. I was wrong. An Islamic funeral being held the next day, July 26 2023. Rest in peace, devardha. ",
				coauthorSocials: {
					githubLink: "https://github.com/devardha",
					githubAlias: "devardha",
					instagramLink: "https://www.instagram.com/ardhayudhatama/",
					instagramAlias: "@ardhayudhatama",
				},
			},
		];
	} else if (coauthorName === "strijunk") {
		return [
			{
				coauthorAlias: "strijunk",
				coauthorName: "Izzul Khaq",
				coauthorProfileImage:
					"https://avatars.githubusercontent.com/u/63136988",
				coauthorDescription: "strijunk is a UI/UX designer and photographer.",
				coauthorSocials: {
					githubLink: "https://github.com/strijunk",
					githubAlias: "strijunk",
					instagramLink: "https://www.instagram.com/powrtrait/",
					instagramAlias: "@powrtrait",
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
			url: `https://naufalhaidar12342.cyou/about/co-authors/${coauthorAlias}`,
			...metadataSiteName,
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
	const [fetchedCoauthorsInfo] = await getCoauthorsInfo(params.coauthor);
	const coauthorName = fetchedCoauthorsInfo.coauthorName;
	const coauthorAlias = fetchedCoauthorsInfo.coauthorAlias;
	const coauthorProfileImage = fetchedCoauthorsInfo.coauthorProfileImage;
	const coauthorDescription = fetchedCoauthorsInfo.coauthorDescription;
	const coauthorGithubLink = fetchedCoauthorsInfo.coauthorSocials.githubLink;
	const coauthorGithubAlias = fetchedCoauthorsInfo.coauthorSocials.githubAlias;
	const coauthorInstagramLink =
		fetchedCoauthorsInfo.coauthorSocials.instagramLink;
	const coauthorInstagramAlias =
		fetchedCoauthorsInfo.coauthorSocials.instagramAlias;
	return (
		<div className="w-full max-w-(--breakpoint-lg) mx-auto min-h-screen isolate z-10">
			<div className="flex flex-col items-center w-full h-full gap-4 p-5">
				<div className="flex flex-col items-center">
					<div className="w-60 h-60 relative">
						<Image
							src={coauthorProfileImage}
							alt={`Profile picture of ${coauthorName} (${coauthorAlias})`}
							style={{ objectFit: "cover" }}
							fill={true}
							priority={true}
							sizes="(max-width: 1280px) 100vw, 70vw"
							className="rounded-full ring-2 ring-sand"
						/>
					</div>
					<h2 className="text-4xl text-lime-300 font-semibold pt-4">
						{coauthorName}
					</h2>
					<span className="text-2xl">({coauthorAlias})</span>
				</div>
				<div className="flex flex-col w-full h-full items-start border-3 border-sand rounded-xl p-4">
					<span className="font-medium text-xl">About {coauthorAlias}</span>
					<p className="pt-2 text-lg">{coauthorDescription}</p>
					
					<span className="font-medium text-xl">Socials</span>
					<div className="flex flex-col gap-2 pt-3">
						<div className="flex items-center gap-2">
							<FaGithub className="text-xl" />
							<a
								href={coauthorGithubLink}
								target="_blank"
								className="text-lg underline decoration-lime-300"
							>
								{coauthorAlias}
							</a>
						</div>
						<div className="flex items-center gap-2">
							<TfiInstagram className="text-xl" />
							<a
								href={coauthorInstagramLink}
								target="_blank"
								className="text-lg underline decoration-lime-300"
							>
								{coauthorInstagramAlias}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
