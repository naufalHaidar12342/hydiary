export default function SkeletonCard() {
	return (
		<div className="card lg:card-side shadow-xl m-5 bg-amazon-green text-white">
			<figure className="w-full lg:w-1/3 xl:w-1/2 h-96 relative animate-pulse">
				{/* image skeleton */}
				<div className="h-full w-full bg-gray-300 rounded-md" />
			</figure>
			<div className="card-body lg:w-1/3 xl:w-1/2 animate-pulse">
				{/* title skeleton */}
				<div className="card-title">
					<div className="bg-gray-300 h-7 w-10/12 rounded-md" />
				</div>
				{/* posted date skeleton */}
				<div className="font-medium italic">
					<div className="bg-gray-300 h-5 w-9/12 rounded-md mt-2" />
				</div>

				{/* excerpt skeleton */}
				<div className="bg-gray-300 rounded-md h-full w-8/12 my-4" />

				{/* tag skeleton */}
				<div className="bg-gray-300 h-12 w-[76.36px] rounded-md" />
				{/* button skeleton */}
				<div className="card-actions justify-end mt-3 animate-pulse">
					<div className="bg-gray-300 h-12 w-full rounded-md" />
				</div>
			</div>
		</div>
	);
}
