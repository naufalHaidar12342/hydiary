import Layout from "@/components/Layout";
import { GraphQLClient } from "graphql-request";
import Image from "next/image";
import { FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
export default function About({ authors, certificates, techStacks }) {
	return (
		<Layout pageTitle="About">
			<div className="hero min-h-screen dark:bg-base-200 ">
				<div className="hero-content flex-col lg:flex-row-reverse">
					{authors.map((author, key) => (
						<div key={key}>
							<Image
								src={author.picture.url}
								className="max-w-sm rounded-lg shadow-2xl lg:mx-3"
								width={300}
								height={340}
								alt={`Photo of website author, ${author.name}`}
								priority
							/>
						</div>
					))}
					<div>
						{authors.map((authorInfo, key) => (
							<div key={key}>
								<h1 className="text-5xl font-bold">
									Hi, I&apos;m {authorInfo.name} !👋
								</h1>
								<p className="py-6 font-medium text-2xl">
									{authorInfo.biography}
								</p>
								<p className="font-medium text-xl">Contact:</p>
								<div className="">
									<ul>
										<li>
											<a
												className="font-medium text-xl link link-hover text-black dark:text-middle-blue-green "
												href="mailto:naufalhaidar12342@gmail.com"
												target={"_blank"}
												rel={"noreferrer"}
											>
												<SiGmail className="mx-2 text-2xl inline-block" />
												naufalhaidar12342
											</a>
										</li>
										<li>
											<a
												className="text-xl font-medium link link-hover text-black dark:text-middle-blue-green "
												href="https://t.me/heydar12342"
												target={"_blank"}
												rel={"noreferrer"}
											>
												<FaTelegramPlane className="mx-2 text-2xl inline-block" />
												Telegram
											</a>
										</li>
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="divider text-3xl">Certificates</div>
			<div className="p-4 lg:max-w-6xl mx-auto">
				<div className="carousel w-full">
					{certificates.map((certificate, index) => {
						//lg: h-800px, w-1200px
						//smaller than lg: h-250px, w-360px
						return (
							<div
								id={`slide-${certificate.id}`}
								key={certificate.id}
								className="carousel-item relative w-full lg:h-[800px] h-[250px]"
							>
								<Image
									fill
									style={{ objectFit: "contain" }}
									src={certificate.certificateImage.url}
									className="w-full"
									alt={certificate.certificateName}
								/>
								<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
									<a
										href={`#slide-${
											certificates[
												index === 0 ? certificates.length - 1 : index - 1
											].id
										}`}
										className="btn btn-circle lg:btn-lg"
									>
										❮
									</a>
									<a
										href={`#slide-${
											certificates[
												index === certificates.length - 1 ? 0 : index + 1
											].id
										}`}
										className="btn btn-circle lg:btn-lg"
									>
										❯
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="divider text-3xl py-4">Website's tech stacks</div>
			<div className="flex flex-col justify-center items-center pb-6">
				<div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
					{techStacks.map((techs, key) => (
						<div
							className="card w-96 dark:bg-columbia-blue dark:text-black bg-github-dark text-white shadow-xl"
							key={key}
						>
							<div className="card-body">
								<h2 className="card-title font-mono">{techs.technologyName}</h2>
								<p className="font-mono">{techs.technologySummary}</p>
								<div className="card-actions justify-end">
									<a className="btn btn-accent" href={techs.technologyWebsite}>
										More
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
	const { authors } = await client.request(`
		{
			authors(where: {name: "Naufal Haidar Rauf"}) {
				biography
				name
				picture {
					url
				}
			}
		}
	`);
	const { certificates } = await client.request(`{
		certificates {
			certificateName
			certificateImage {
				url
			}
			id
		}
	}`);

	const { techStacks } = await client.request(`{
		techStacks(where:{technologyCategories_contains_all: Website_Pribadi}){
			technologyName
			technologySummary
			technologyWebsite
		}
	}`);

	return {
		props: {
			authors,
			certificates,
			techStacks,
		},
	};
}
