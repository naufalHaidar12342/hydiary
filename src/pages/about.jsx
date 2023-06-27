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
								<h2 className="text-4xl font-semibold dark:text-slate-200 text-black">
									Hi, I&apos;m {authorInfo.name} !👋
								</h2>
								<p className="py-6 font-normal text-2xl dark:text-slate-200 text-black">
									{authorInfo.biography}
								</p>
								<p className="font-normal text-xl dark:text-slate-200 text-black">
									Contact:
								</p>
								<div className="">
									<ul>
										<li>
											<a
												className="font-semibold text-xl link link-hover text-black dark:text-jet-stream "
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
												className="text-xl font-semibold link link-hover text-black dark:text-jet-stream "
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
			{/* section below talks about website */}
			<div className="hero h-96 w-full">
				<div className="flex flex-col hero-content max-w-7xl lg:flex-row-reverse">
					<h2 className="text-4xl font-semibold dark:text-slate-200 text-black">
						About Website
					</h2>
					<div className="text-2xl">
						<p>
							Co-authored by the good friend of author,
							<a href="" className="link link-hover">
								devardha
							</a>{" "}
							, this website acts as a diary for me to tell you what&apos;s in
							my mind. Be it about games, personal experience, programming
							tutorial, it will be catalogued here.
						</p>
						<p className="pt-2">
							I hope you will find something useful here. Don&apos;t worry, this
							site doesn&apos;t contain any ads, so you can read it without any
							distraction.
						</p>
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
