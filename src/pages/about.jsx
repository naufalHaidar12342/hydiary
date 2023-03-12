import Layout from "@/components/Layout";
import { GraphQLClient } from "graphql-request";
import Image from "next/image";

export default function About({ authors, certificates, techStacks }) {
	let slideID = 1;
	return (
		<Layout pageTitle="About">
			<div className="hero min-h-screen dark:bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					{authors.map((author, key) => (
						<Image
							src={author.picture.url}
							className="max-w-sm rounded-lg shadow-2xl lg:mx-3"
							width={320}
							height={380}
							alt={`Photo of website author, ${author.name}`}
							style={{ width: "auto", height: "auto" }}
							key={key}
							priority
						/>
					))}
					<div>
						{authors.map((authorInfo, key) => (
							<div key={key}>
								<h1 className="text-5xl font-bold">
									Hi, I'm {authorInfo.name}!👋
								</h1>
								<p className="py-6 font-medium text-2xl">
									{authorInfo.biography}
								</p>
							</div>
						))}
						<a
							className="btn btn-lg w-full border-none bg-viridian text-white active:bg-middle-blue-green active:text-base-200 hover:bg-middle-blue-green"
							href="#contact-me"
						>
							Contact
						</a>
					</div>
				</div>
			</div>
			<div className="divider text-3xl">Certificates</div>
			<div className="p-3 lg:max-w-6xl mx-auto">
				<div className="carousel w-full">
					{certificates.map((certificate, key) => (
						<div id={`slide${key}`} className="carousel-item relative w-full">
							<img
								src={certificate.certificateImage.url}
								className="w-full"
								alt={certificate.certificateName}
							/>
							<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
								<a
									href={`#slide${slideID}`}
									className="btn btn-circle lg:btn-lg"
								>
									❮
								</a>
								<a
									href={`#slide${slideID++}`}
									className="btn btn-circle lg:btn-lg"
								>
									❯
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="divider text-3xl">Tech stack</div>
			<div className="flex flex-col items-center">
				<div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-3">
					{techStacks.map((techs, key) => (
						<div key={key}>
							<div className="card w-96 bg-columbia-blue shadow-xl">
								<figure className="px-10 pt-10">
									<Image
										src={techs.technologyLogo.url}
										alt={`Logo of ${techs.technologyName}`}
										className="rounded-xl"
										width={250}
										height={140}
										style={{ width: "auto", height: "auto" }}
									/>
								</figure>
								<div className="card-body items-center text-center text-black">
									<h2 className="card-title">{techs.technologyName}</h2>
									<p>{techs.technologySummary}</p>
									<div className="card-actions">
										<a
											className="btn border-none bg-viridian text-white hover:bg-middle-blue-green hover:text-black"
											href={techs.technologyWebsite}
											target="_blank"
										>
											Visit
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="divider text-3xl" id="contact-me">
				Contact Me
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const API =
		"https://ap-southeast-2.cdn.hygraph.com/content/cl7gawkjl7suf01uhdrd42szp/master";
	const client = new GraphQLClient(API);
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
			technologyLogo {
				url
			}
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
