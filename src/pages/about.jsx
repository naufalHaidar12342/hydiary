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
									Hi, I&apos;m {authorInfo.name}!👋
								</h1>
								<p className="py-6 font-medium text-2xl">
									{authorInfo.biography}
								</p>
								<div className="flex flex-col">
									<a
										className="font-medium text-xl link text-uranian-blue flex items-center"
										href="mailto:naufalhaidar12342@gmail.com"
										target={"_blank"}
										rel={"noreferrer"}
									>
										<SiGmail className="mx-2 text-2xl" />
										naufalhaidar12342
									</a>
									<a
										className="text-xl font-medium link text-uranian-blue flex items-center"
										href="https://t.me/heydar12342"
										target={"_blank"}
										rel={"noreferrer"}
									>
										<FaTelegramPlane className="mx-2 text-2xl" />
										Telegram
									</a>
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
						return (
							<div
								id={`slide-${certificate.id}`}
								key={certificate.id}
								className="carousel-item relative w-full"
							>
								<img
									src={certificate.certificateImage.url}
									className="w-full"
									alt={certificate.certificateName}
									loading="lazy"
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
			<div className="divider text-3xl py-4">Tech stack</div>
			<div className="flex flex-col justify-center items-center pb-6">
				<div className="grid lg:grid-cols-2 col-1 gap-3">
					{techStacks.map((techs, key) => (
						<div key={key} className="">
							<div className="card w-80 max-w-screen bg-columbia-blue shadow-xl ">
								<figure className="px-10 pt-10">
									<Image
										src={techs.technologyLogo.url}
										alt={`Logo of ${techs.technologyName}`}
										className="rounded-xl w-auto h-auto"
										width={250}
										height={140}
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
											rel="noreferrer"
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
