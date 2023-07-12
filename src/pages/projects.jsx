import Layout from "@/components/Layout";
import { GraphQLClient } from "graphql-request";
import { MdOutlineAndroid } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import { format } from "date-fns";

export default function Projects({ projects }) {
	return (
		<Layout pageTitle="Projects">
			<div className="relative antialiased">
				<div className="relative min-h-screen flex flex-col justify-start overflow-hidden">
					<div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
						<h2 className="text-center text-3xl">History of my projects</h2>
						<div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
							<div className="w-full max-w-3xl mx-auto">
								<div className="-my-6">
									{/*item each of timeline, start from bottom*/}
									{projects.map((project, key) => (
										<div
											className="relative pl-8 sm:pl-32 py-6 group"
											key={key}
										>
											{/*purple label*/}
											<div className="font-caveat font-medium text-2xl dark:text-slate-200 text-black mb-1 sm:mb-0">
												{project.projectTitle}
											</div>
											{/*<!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after)*/}
											<div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-400 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-deep-aquamarine after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
												<time class="sm:absolute -left-14 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-36 h-6 mb-3 sm:mb-0 text-dark-slate-gray bg-emerald-100 rounded-full">
													{format(
														new Date(project.repositoryCreatedDate),
														"MMMM dd, yyyy"
													)}
												</time>
												{project.projectPlatform === "Web" ? (
													<div className="text-xl font-bold text-black dark:text-slate-200">
														Platform:{" "}
														<BsGlobe className="inline-block w-6 h-6" />
														{project.projectPlatform}{" "}
													</div>
												) : (
													<div className="text-xl font-bold text-black dark:text-slate-200">
														Platform:{" "}
														<MdOutlineAndroid className="inline-block w-6 h-6" />{" "}
														{project.projectPlatform}{" "}
													</div>
												)}
											</div>
											{/*<!-- Content -->*/}
											<div className="text-slate-600 dark:text-columbia-blue">
												{project.projectShortDescription}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
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
		projects(orderBy: repositoryCreatedDate_ASC) {
			projectTitle
			projectPlatform
			projectShortDescription
			projectsRepositoryLink
			repositoryCreatedDate
		}
	}`);

	return {
		props: {
			projects,
		},
	};
}
