import {
	PROJCETS_OGIMAGE,
	PROJECTS_OGIMAGE_CREDITS,
} from "@/constants/projects_ogimage";
import { BASE_URL } from "@/libraries/base-url";
import { metadataBaseUrl } from "@/libraries/metadata-base";
import { metadataRobotsRule } from "@/libraries/metadata-robots";
import { metadataSiteName } from "@/libraries/metadata-sitename";
import { BiLinkExternal } from "react-icons/bi";
import ProjectsGallery from "./projects-gallery";

export async function generateMetadata() {
	const [latestProject] = await getLatestProject();
	const latestProjectTitle = latestProject.projectTitle;
	return {
		title: "Projects",
		description: `Check out ${latestProjectTitle}, my latest project. Oh and also check other projects in this page.`,
		...metadataBaseUrl,
		...metadataRobotsRule,

		openGraph: {
			title: "Projects of nh12342",
			description: `Check out ${latestProjectTitle}, my latest project. Oh and also check other projects in this page`,
			url: `${BASE_URL}projects`,
			...metadataSiteName,
			images: [
				{
					url: PROJCETS_OGIMAGE,
					width: 1200,
					height: 630,
					alt: PROJECTS_OGIMAGE_CREDITS,
				},
			],
		},
	};
}

export async function getLatestProject() {
	const fetchProjects = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query ListOfProjects{
				projects(orderBy: createdAt_DESC, first:1){
					projectTitle
					projectShortDescription
					projectsRepositoryLink
					projectCoverImageAttribution{
						attributionImage{
							url
						}
					}
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return fetchProjects.data.projects;
}

export async function getListOfProjects() {
	const fetchProjects = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query ListOfProjects{
				projects(orderBy: createdAt_DESC, where:{projectPlatform: Web}){
					projectTitle
					projectShortDescription
					projectPlatform
					projectsRepositoryLink
					projectCoverImageAttribution{
						attributionImage{
							url
						}
					}
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return fetchProjects.data.projects;
}
export default async function Projects() {
	const fetchedProjects = await getListOfProjects();
	return (
		<div className="w-full max-w-screen-xl mx-auto min-h-screen flex flex-col p-6">
			<div className="h-full w-full">
				<ProjectsGallery listOfProjects={fetchedProjects} />
			</div>
		</div>
	);
}
