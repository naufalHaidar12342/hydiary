export default function SkeletonArticle() {
	return (
		<div className="flex flex-col lg:flex-row">
			<figure className="w-full 2xl:w-1/2 h-64 relative"></figure>

			{/* title and excerpt */}
			<div className="w-full 2xl:w-1/2 py-5 lg:pl-6 lg:py-0 animate-pulse">
				<span></span>
				<div className="flex flex-col">
					<div className="py-1">
						<div className="badge badge-outline badge-lg"></div>
					</div>
				</div>
				<p className="pt-4 pb-2 "></p>
				<p className="pt-1 font-mono">Posted updatedAt</p>
			</div>
		</div>
	);
}
