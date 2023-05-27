import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ allPost }) {
	return (
		<div className="card lg:card-side shadow-xl m-5 dark:bg-columbia-blue dark:text-black bg-github-dark text-white">
			<figure className="w-full xl:w-1/2 h-96 relative">
				<Image
					src={allPost.coverImage.url}
					alt="Cover image of post"
					fill
					style={{ objectFit: "cover" }}
					priority={true}
					sizes="(max-width: 768px) 100vw"
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPsnnqyHgAGBgJq/yXBZAAAAABJRU5ErkJggg=="
				/>
			</figure>
			<div className="card-body xl:w-1/2">
				<h2 className="card-title">{allPost.title}</h2>
				<p className="font-medium italic">
					Posted at {format(new Date(allPost.createdAt), "MMMM dd, yyyy hh:mm")}
				</p>
				<p className="font-medium text-base">{allPost.excerpt}</p>
				{allPost.tags.map((postGenre, key) => (
					<div className="badge badge-outline badge-lg" key={key}>
						{postGenre}
					</div>
				))}
				<div className="card-actions justify-end mt-3">
					<Link
						href={`/blogposts/${allPost.slug}`}
						className="btn text-white w-full text-base font-medium normal-case"
					>
						Read full article
					</Link>
				</div>
			</div>
		</div>
	);
}
