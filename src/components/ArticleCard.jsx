import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ allPost }) {
	return (
		<div className="card lg:card-side bg-blue-bell text-white shadow-xl m-5">
			<figure className="w-full h-96 relative">
				<Image
					src={allPost.coverImage.url}
					alt="Cover image of post"
					fill
					style={{ objectFit: "cover" }}
				/>
			</figure>
			<div className="card-body">
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
						className="btn bg-viridian border-none text-white hover:bg-middle-blue-green hover:text-slate-800 w-full text-base font-medium normal-case"
					>
						Read More
					</Link>
				</div>
			</div>
		</div>
	);
}
