"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	FreeMode,
	Navigation,
	Thumbs,
	EffectCoverflow,
	Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "@nextui-org/link";

export default function ProjectsGallery({ listOfProjects }) {
	const [thumbnailSwipers, setThumbnailSwipers] = useState(null);
	return (
		<div>
			<Swiper
				style={{
					"--swiper-navigation-color": "#E4E0D5",
					"--swiper-pagination-color": "#E4E0D5",
				}}
				navigation={true}
				thumbs={{ swiper: thumbnailSwipers }}
				modules={[FreeMode, Navigation, Thumbs]}
				aria-label="Main slideshow"
			>
				{listOfProjects.map((project, index) => (
					<SwiperSlide key={index}>
						<div className="h-full w-full">
							<div className="h-96 w-full relative">
								<Image
									src={
										project.projectCoverImageAttribution.attributionImage.url
									}
									alt="Project cover image"
									style={{ objectFit: "cover" }}
									fill={true}
									priority={true}
									className="rounded-xl"
								/>
							</div>
							<div className="w-full py-4 bg-dark-gradient ">
								<h2 className="text-3xl font-semibold text-lime-300">
									{project.projectTitle}
								</h2>
								<p className="text-2xl font-light">
									{project.projectShortDescription}
								</p>
								<Button
									as={Link}
									className="bg-sand text-xl font-medium mt-4"
									color="success"
									href={project.projectsRepositoryLink}
									endContent={<LuArrowUpRight />}
									target="_blank"
								>
									Visit project
								</Button>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setThumbnailSwipers}
				spaceBetween={10}
				slidesPerView={3}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Thumbs, Navigation]}
				aria-label="Thumbnails for the main slideshow"
				className=""
			>
				{listOfProjects.map((project, index) => (
					<SwiperSlide key={index}>
						<div className="h-40 w-full relative">
							<Image
								src={project.projectCoverImageAttribution.attributionImage.url}
								alt="Project cover image"
								style={{ objectFit: "cover" }}
								fill={true}
								priority={true}
								className="rounded-xl"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
