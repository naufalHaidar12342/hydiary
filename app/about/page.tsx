import Image from "next/image";
import {
	FaMastodon,
	FaGithub,
	FaLinkedinIn,
	FaSteam,
	FaGooglePlay,
	FaDesktop,
} from "react-icons/fa6";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { IoLogoFigma } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";

import { FALLBACK_HYGRAPH_API } from "../utilities/constants/apiHygraphConfigs";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(parents:ResolvingMetadata):Promise<Metadata> {
	return {
		title: "About",
		description: `More info about me`,

		openGraph: {
			title: "About",
			description: `More info about me`,

		},
	};
}

export async function getAuthorsInfo() {
	const authors = await fetch(process.env.HYGRAPH_HIPERF_API || FALLBACK_HYGRAPH_API, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query AuthorsInfo{
                authors(where: {name_contains: "Naufal Haidar Rauf"}) {
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
		<div className="min-h-screen w-full max-w-(--breakpoint-lg) flex flex-col md:flex-row mx-auto gap-4 p-4 isolate z-10">
			<div className="flex flex-col w-full h-fit  border-2 border-sand rounded-xl items-center md:items-start p-5 relative z-20">
				<div className="w-60 h-60 relative bg-linear-to-b from-darkblue-gradient to-lime-300 rounded-full">
					<Image
						src={authorProfileImage}
						alt={authorName}
						style={{ objectFit: "cover" }}
						fill={true}
						priority={true}
						className="rounded-full p-1"
						sizes="(max-width:1280px) 100vw, 70vw"
					/>
				</div>
				<h2 className={`text-4xl font-semibold font-(family-name:--font-caveat)`}>
					{authorName}
				</h2>
				<span>
					Aspiring web programmer and researcher that grew up along video games
				</span>

				<span>Find me on:</span>
				<div className="flex text-2xl pt-2 gap-4"></div>

				<div className="flex flex-col pt-5 gap-4">
					<div className="flex items-center gap-2">
						<FaSteam className="text-2xl" />
						<span className="font-(family-name:--font-ibm-plex-mono)">Steam ID: 1144957646</span>
					</div>
					<div className="flex items-center gap-2">
						<FaGooglePlay className="text-2xl" />
						<span className="font-(family-name:--font-ibm-plex-mono)">Arknights: Dr. Heydar#4458</span>
					</div>

				</div>
			</div>
			<div className="flex flex-col w-full h-fit gap-4 p-5 border-4 border-sand rounded-xl relative z-20">
				<div className="flex flex-col gap-2">
					<span className="text-xl font-medium font-(family-name:--font-ibm-plex-mono)">More about me</span>
					<p>
						Amateur web programmer previously interned as graphical user
						interface programmer and researcher for website-based chatbot. This
						project is also part of{" "}
						<a
							href="https://ieeexplore.ieee.org/document/10405316"
							target="_blank"
							className="underline underline-offset-1 decoration-lime-300"
						>
							&quot;Human-Robot Interaction on Elderly Companion Robot using
							Dual Intent Entity Transformer&quot;
						</a>{" "}
						presented at 2023 7th International Conference on Information
						Technology, Information Systems and Electrical Engineering
						(ICITISEE) in Purwokerto, Indonesia.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-xl font-medium font-(family-name:--font-ibm-plex-mono)">Skills</span>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2 items-center">
							<SiNextdotjs className="text-2xl" />
							<span>Next.js : Beginner</span>
						</div>
						<div className="flex gap-2 items-center">
							<SiTailwindcss className="text-2xl" />
							<span>Tailwind CSS : Beginner</span>
						</div>
						<div className="flex gap-2 items-center">
							<IoLogoFigma className="text-2xl" />
							<span>Figma : Beginner</span>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-xl font-medium font-(family-name:--font-ibm-plex-mono)">Language</span>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2 items-center">
							<span>Indonesia : Native</span>
						</div>
						<div className="flex gap-2 items-center">
							<span>English : Conversational</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
