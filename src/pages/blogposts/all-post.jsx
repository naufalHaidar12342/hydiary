import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { format } from "date-fns";
import { GraphQLClient } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllPosts({ posts }) {
	const [blogposts, setBlogposts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPosts, setTotalPosts] = useState();
	const [postsPerPage] = useState(4);
	return (
		<Layout pageTitle="All Posts">
			<div className="flex flex-col justify-center items-center p-6">
				<h2 className="text-3xl my-4 p-4">All Posts</h2>
				<div className="grid grid-cols-1 2xl:grid-cols-2 col-span-2 gap-5 p-12">
					{posts.map((allPost, key) => (
						<div className="flex flex-col lg:flex-row" key={key}>
							<figure className="w-full  2xl:w-1/2 h-64 relative">
								<Image
									className="rounded-lg"
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

							{/* title and excerpt */}
							<div className="w-full 2xl:w-1/2 py-5 lg:pl-6 lg:py-0">
								<span>
									<Link
										href={`/blogposts/${allPost.slug}`}
										className="text-2xl font-medium link link-hover"
									>
										{allPost.title}
									</Link>
								</span>
								<div className="flex flex-col">
									{allPost.tags.map((postGenre, key) => (
										<div className="py-1" key={key}>
											<div className="badge badge-outline badge-lg" key={key}>
												{postGenre}
											</div>
										</div>
									))}
								</div>
								<p className="pt-4 pb-2 ">{allPost.excerpt}</p>
								<p className="pt-1 font-mono">
									Posted at{" "}
									{format(new Date(allPost.createdAt), "MMMM dd, yyyy hh:mm")}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
}
export async function getStaticProps() {
	const client = new GraphQLClient(process.env.HYGRAPH_HIPERF_API);
	const { posts } = await client.request(`
	{
		posts(orderBy: createdAt_DESC, first: 6) {
			id
			title
			publishedAt
			createdAt
			slug
			tags
			excerpt
			coverImage {
				url
			}
		}
		
	}`);

	return {
		props: {
			posts,
		},
	};
}

const paginate = (pageNumber) => setCurrentPage(pageNumber);
const previousPage = () => {
	if (currentPage !== 1) {
		setCurrentPage(currentPage - 1);
	}
};
const nextPage = () => {
	if (currentPage !== Math.ceil(totalPosts / postsPerPage)) {
		setCurrentPage(currentPage + 1);
	}
};
