import Layout from "@/components/Layout";
import axios from "axios";
import { GraphQLClient } from "graphql-request";
import Image from "next/image";
import useSWR from "swr";
const fetcher = async (url) => {
	const response = await axios.get(url, {
		headers: {
			"x-Api-Key": process.env.RANDOMFACTS_API_KEY,
		},
	});
	return response.data;
};

export default function About({ authors, facts }) {
	const { data, error } = useSWR(
		"https://api.api-ninjas.com/v1/facts",
		fetcher
	);
	return (
		<Layout pageTitle="About">
			<div className="flex flex-col justify-between items-center bg-base-200 p-4">

				<div className="hero min-h-[250px] dark:bg-base-200 dark:text-slate-200 text-black" >
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
									<h2 className="text-4xl font-semibold">
										hi, I&apos;m Heydar!👋
									</h2>
									<p className="py-6 font-normal text-2xl ">
										{authorInfo.biography}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
				{/* section below talks about website */}
				<div className=" hero min-h-[250px] dark:bg-base-200" >
					<div className="hero-content flex-col lg:flex-row-reverse dark:text-slate-200 text-black">
						<div className="text-4xl font-semibold ">about this website</div>
						<div className="text-2xl">
							<p>
								This website, co-authored by author&apos;s good friend{" "}
								<a href="https://ardha.dev/" rel="noreferrer" target="_blank">
									devardha
								</a>
								, serves as a diary for me to tell you what is on my mind. It will
								be cataloged here whether it is about games, personal experience,
								or programming tutorials. I hope you find something helpful here.
								Don&apos;t worry, this site is free of advertisements, so you may
								read it without interruption.
							</p>
						</div>

					</div>
				</div>
				{/* section below talks about random facts */}
				<div className="hero min-h-[250px] dark:bg-base-200">
					<div className="hero-content flex-col  lg:flex-row-reverse dark:text-slate-200 text-black" >
						<h2 className="text-4xl font-semibold lg:order-last">random facts today</h2>
						<div className="text-2xl">
							{facts.map((factGenerated, key) => (
								<p key={key} className="italic">
									{factGenerated.fact}
								</p>
							))}
						</div>

					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const client = new GraphQLClient(process.env.HYGRAPH_HIPERF_API);
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

	const url = "https://api.api-ninjas.com/v1/facts";
	const response = await axios.get(url, {
		headers: {
			"x-Api-Key": process.env.RANDOMFACTS_API_KEY,
		},
	});
	const facts = response.data;
	// const fetcher = (url) =>
	// 	axios
	// 		.get(url, {
	// 			headers: {
	// 				"x-Api-Key": process.env.RANDOMFACTS_API_KEY,
	// 			},
	// 		})
	// 		.then((res) => res.data);
	// const { data, error } = useSWR(url, fetcher);
	// if (error) {
	// 	return {
	// 		props: {
	// 			facts: "Random facts unable to be fetched",
	// 		},
	// 	};
	// }
	const dataOfFacts = await fetcher(url);
	return {
		props: {
			authors,
			certificates,
			techStacks,
			facts,
		},
	};
}
