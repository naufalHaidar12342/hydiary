import { RANDOM_FACTS_URL } from "app/constants/random_facts_url";
import Image from "next/image";

export function metadata() {
	return {
		title: "About",
		description: `Learn about authors and random facts of the day.`,
	};
}

export async function getRandomFacts() {
	const res = await fetch(RANDOM_FACTS_URL, {
		headers: {
			"X-Api-Key": process.env.PRIVATE_API_NINJAS,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
	return res;
}

export async function getAuthorsInfo() {
	const authors = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query AuthorsInfo{
                authors {
					id
                    name
                    biography
                    picture {
                        url
                    }
                }
            }`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
	return authors.data.authors;
}

export default async function About() {
	const randomFacts = await getRandomFacts();
	const authors = await getAuthorsInfo();
	return (
		<div className="min-h-screen max-w-screen-lg mx-auto flex flex-col justify-center items-center p-4">
			<h2 className="text-3xl font-semibold text-dark-slate-gray dark:text-jet-stream ">
				Authors
			</h2>
			<p className="text-lg mb-4">Meet the force behind naufalHaidar12342 !</p>
			<div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
				{authors.map((author) => (
					<div className="flex flex-col max-w-md" key={author.id}>
						<div className="w-full h-48 2xl:h-[460px] relative">
							<Image
								src={author.picture.url}
								alt={author.name}
								style={{ objectFit: "cover" }}
								fill
								priority={true}
								className="rounded-xl"
								sizes="(max-width: 1536px) 100vw, 80vw"
								placeholder="blur"
								blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMiI0tAgADjQF+ZG6tZQAAAABJRU5ErkJggg=="
							/>
						</div>
						{/* wrapper for name and biography, to center the text a bit easier */}
						<div className="text-center">
							<h2 className="text-xl font-medium text-dark-slate-gray dark:text-jet-stream mt-2">
								{author.name}
							</h2>
							<p className="text-lg">{author.biography}</p>
						</div>
					</div>
				))}
			</div>
			{/* random facts section */}
			<h4 className="text-xl font-medium text-dark-slate-gray dark:text-jet-stream">
				Random facts of the day🤔🤯
			</h4>
			{randomFacts.map((factOfTheDay) => (
				<p className="mt-3 text-xl italic" key={factOfTheDay.fact}>
					{factOfTheDay.fact}
				</p>
			))}
		</div>
	);
}
