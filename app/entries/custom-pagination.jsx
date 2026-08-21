"use client";
import Link from "next/link";

import BackToTopButton from "@/components/backtotop-button";
export default function CustomPagination({ page }) {
	return (
		<div className="flex flex-col w-full md:items-center md:flex-row gap-3 z-30">
			<BackToTopButton />
			<button
				as={Link}
				variant="bordered"
				href={`/entries?page=${page > 1 ? page - 1 : 1}`}
				className="font-medium"
				size="lg"
			>
				Previous page
			</button>
			<div
				size="lg"
				total={8}
				page={page}
				variant="bordered"
				classNames={{
					cursor: "bg-lime-200 text-darkblue-gradient font-medium",
				}}
			/>
			<button
				as={Link}
				variant="bordered"
				href={`/entries?page=${page + 1}`}
				className="font-medium"
				size="lg"
			>
				Next page
			</button>
		</div>
	);
}
