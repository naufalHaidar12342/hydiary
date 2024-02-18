import {
	ABOUT_OGIMAGE,
	ABOUT_OGIMAGE_CREDITS,
} from "@/constants/about_ogimage";
import { caveat } from "@/libraries/fonts";
import { metadataBaseUrl } from "@/libraries/metadata-base";
import { metadataRobotsRule } from "@/libraries/metadata-robots";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import {
	FaMastodon,
	FaGithub,
	FaLinkedinIn,
	FaSteam,
	FaGooglePlay,
	FaDesktop,
} from "react-icons/fa6";

export async function generateMetadata() {
	return {
		title: "About",
		description: `Learn about authors and random facts of the day.`,
		...metadataBaseUrl,
		...metadataRobotsRule,
		openGraph: {
			title: "About",
			description: `Learn about authors and random facts of the day.`,
			url: `https://naufalhaidar12342.cyou/about`,
			images: [
				{
					url: ABOUT_OGIMAGE,
					width: 1200,
					height: 630,
					alt: ABOUT_OGIMAGE_CREDITS,
				},
			],
		},
	};
}

export async function getAuthorsInfo() {
	const authors = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query AuthorsInfo{
                authors (where: {name: "Naufal Haidar Rauf"}) {
                    name
                    biography
                    picture {
                        url
                    }
                }
            }`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
	return authors.data.authors;
}

export default async function About() {
	const [fetchedAuthorInfo] = await getAuthorsInfo();
	const authorName = fetchedAuthorInfo.name;
	const authorProfileImage = fetchedAuthorInfo.picture.url;
	return (
		<div className="h-screen w-full flex flex-col md:flex-row mx-auto gap-4 p-4">
			<div className="flex flex-col w-full h-fit border-2 border-sand rounded-xl items-center md:items-start p-5">
				<div className="w-60 h-60 relative bg-gradient-to-b from-darkblue-gradient to-lime-300 rounded-full">
					<Image
						src={authorProfileImage}
						alt={authorName}
						style={{ objectFit: "cover" }}
						fill={true}
						priority={true}
						className="rounded-full p-1"
					/>
				</div>
				<h2 className={`text-4xl font-semibold ${caveat.className}`}>
					{authorName}
				</h2>
				<span>
					Aspiring web programmer and researcher that grew up along video games
				</span>
				<Divider className="bg-lime-300 rounded-xl h-1 my-2" />
				<span>Find me on:</span>
				<div className="flex text-2xl pt-2 gap-4">
					<Tooltip content="GitHub" placement="bottom">
						<a href="https://github.com/naufalHaidar12342" target="_blank">
							<FaGithub />
						</a>
					</Tooltip>
					<Tooltip content="Mastodon" placement="bottom">
						<a
							href="https://mastodon.social/@naufalhaidar12342"
							target="_blank"
						>
							<FaMastodon />
						</a>
					</Tooltip>
					<Tooltip content="LinkedIn" placement="bottom">
						<a
							href="https://linkedin.com/in/naufal-haidar-rauf/"
							target="_blank"
						>
							<FaLinkedinIn />
						</a>
					</Tooltip>
				</div>

				<div className="flex flex-col pt-6 gap-4">
					<div className="flex items-center gap-2">
						<FaSteam className="text-2xl" />
						<span>Steam ID: 1144957646</span>
					</div>
					<div className="flex items-center gap-2">
						<FaGooglePlay className="text-2xl" />
						<span>Arknights: Dr. Heydar#4458</span>
					</div>
					<div className="flex items-center gap-2">
						<FaDesktop className="text-2xl" />
						<span>Honkai Star Rail</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full h-full gap-4 p-5 border-2 border-sand rounded-xl">
				<div className="flex flex-col gap-2">
					<span className="text-xl font-medium">More about me</span>
					<p>
						Amateur web programmer previously interned as graphical user
						interface programmer and researcher for website-based chatbot. This
						project is also part of{" "}
						<a
							href="https://ieeexplore.ieee.org/document/10405316"
							target="_blank"
							className="underline underline-offset-1 decoration-lime-300"
						>
							"Human-Robot Interaction on Elderly Companion Robot using Dual
							Intent Entity Transformer"
						</a>{" "}
						presented at 2023 7th International Conference on Information
						Technology, Information Systems and Electrical Engineering
						(ICITISEE) in Purwokerto, Indonesia.
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-xl font-medium">Skills</span>
					<p>
						Amateur web programmer previously interned as graphical user
						interface programmer and researcher for website-based chatbot. This
						project is also part of{" "}
						<a
							href="https://ieeexplore.ieee.org/document/10405316"
							target="_blank"
							className="underline underline-offset-1 decoration-lime-300"
						>
							"Human-Robot Interaction on Elderly Companion Robot using Dual
							Intent Entity Transformer"
						</a>{" "}
						presented at 2023 7th International Conference on Information
						Technology, Information Systems and Electrical Engineering
						(ICITISEE) in Purwokerto, Indonesia.
					</p>
				</div>
			</div>
		</div>
	);
}
