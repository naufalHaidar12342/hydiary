import { RANDOM_FACTS_URL } from "app/constants/random_facts_url";
import Image from "next/image";

export async function getRandomFacts() {
	const res = await fetch(RANDOM_FACTS_URL, {
		headers: {
			"X-Api-Key": process.env.PRIVATE_API_NINJAS,
		},
	});
	const data = res.json();
	return data;
}

export async function getAuthorsInfo() {
	const authors = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query AuthorsInfo{
                authors(where: {name: "Naufal Haidar Rauf"}) {
                    biography
                    name
                    picture {
                        url
                    }
                }
            }`,
		}),
	});
}

export default async function About() {
	const dataOfFacts = await getRandomFacts();
	return (
		<div className="flex flex-col justify-between items-center bg-base-200 p-4">
			<div className="hero min-h-[250px] dark:bg-base-200 dark:text-slate-200 text-black">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div></div>
				</div>
			</div>
		</div>
	);
}
