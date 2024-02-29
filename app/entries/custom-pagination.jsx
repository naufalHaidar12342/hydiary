"use client";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import BackToTopButton from "@/components/backtotop-button";
export default function CustomPagination({ page }) {
	return (
		<div className="flex flex-col w-full md:items-center md:flex-row gap-3 z-30">
			<BackToTopButton />
			<Button
				as={Link}
				variant="bordered"
				href={`/entries?page=${page > 1 ? page - 1 : 1}`}
				className="font-medium"
				size="lg"
			>
				Previous page
			</Button>
			<Pagination
				size="lg"
				total={8}
				page={page}
				variant="bordered"
				classNames={{
					cursor: "bg-lime-200 text-darkblue-gradient font-medium",
				}}
			/>
			<Button
				as={Link}
				variant="bordered"
				href={`/entries?page=${page + 1}`}
				className="font-medium"
				size="lg"
			>
				Next page
			</Button>
		</div>
	);
}
