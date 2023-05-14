import Layout from "@/components/Layout";
import { GraphQLClient } from "graphql-request";
import { GoRepo } from "react-icons/go";
import { MdOutlineAndroid } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
export default function Projects({ projects }) {
	return (
		<Layout pageTitle="Projects">
			<div className="flex flex-col justify-center items-center p-6">
				<h1 className="text-3xl my-4">Projects</h1>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
					{projects.map((project, key) => (
						<div
							className="card lg:w-96 dark:bg-columbia-blue dark:text-black bg-github-dark text-white shadow-xl"
							key={key}
						>
							<div className="card-body">
								<h2 className="card-title">
									<GoRepo className="inline-block" />
									{project.projectTitle}
								</h2>
								<div
									className={
										"badge p-4  " +
										(project.projectPlatform == "Android"
											? "badge-accent"
											: "badge-info")
									}
								>
									Platform: {project.projectPlatform}{" "}
									{project.projectPlatform == "Android" ? (
										<MdOutlineAndroid className="ml-2 inline-block text-xl" />
									) : (
										<BsGlobe className="ml-2 inline-block text-xl" />
									)}
								</div>
								<p>{project.projectShortDescription}</p>
								<div className="card-actions justify-end">
									<a
										className={
											"btn " +
											(project.projectPlatform == "Android"
												? "btn-accent"
												: "btn-info")
										}
										href={project.projectsRepositoryLink}
										rel="noopener"
										target="_blank"
									>
										Repository
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const client = new GraphQLClient(
		"https://ap-southeast-2.cdn.hygraph.com/content/cl7gawkjl7suf01uhdrd42szp/master"
	);
	const { projects } = await client.request(`
	{
		projects(orderBy: publishedAt_DESC) {
			projectTitle
			projectPlatform
			projectShortDescription
			projectsRepositoryLink
		}
	}`);

	return {
		props: {
			projects,
		},
	};
}
