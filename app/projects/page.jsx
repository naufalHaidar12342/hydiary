import { BiLinkExternal } from "react-icons/bi";
export const metadata = {
	title: "Projects",
	description:
		"Compiled list of projects I have worked on and hosted on GitHub.",
};

export async function getListOfProjects() {
	const fetchProjects = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query ListOfProjects{
				projects(orderBy: createdAt_DESC){
					projectTitle
					projectShortDescription
					projectPlatform
					projectsRepositoryLink
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return fetchProjects.data.projects;
}
export default async function Projects() {
	const projects = await getListOfProjects();
	return (
		<div className="min-h-screen flex flex-col justify-center items-center p-6">
			<h2 className="text-3xl my-4 p-4">List of projects</h2>
			<div className="grid grid-cols-1 2xl:grid-cols-2 col-span-2 gap-3 2xl:gap-5 p-6">
				{projects.map((project) => (
					<div className="flex flex-col" key={project.projectTitle}>
						<div className="w-full py-2">
							<a
								href={project.projectsRepositoryLink}
								className="font-medium text-lg link link-hover text-dark-slate-gray dark:text-jet-stream"
							>
								{project.projectTitle}
								<BiLinkExternal className="inline-flex ml-1 dark:text-jet-stream text-dark-slate-gray" />
							</a>
							<p className="">{project.projectShortDescription}</p>
							<div className="badge badge-md badge-info">
								{project.projectPlatform}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
