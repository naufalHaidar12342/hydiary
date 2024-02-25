"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";

export default function ProjectsGallery({ listOfProjects }) {
	return (
		<div className="projects-gallery">
			<Swiper
				modules={[EffectCoverflow, Pagination]}
				effect="coverflow"
				grabCursor={true}
				centeredSlides={true}
				slidesPerView="auto"
				coverflowEffect={{
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}}
				pagination={{
					clickable: true,
				}}
				className="mySwiper"
			>
				{listOfProjects.map((project, index) => (
					<SwiperSlide key={index}>
						<div className="project-image">
							<img
								src={project.projectCoverImageAttribution.attributionImage.url}
								alt={project.projectTitle}
							/>
						</div>
						<div className="project-details">
							<h3>{project.projectTitle}</h3>
							<p>{project.projectShortDescription}</p>
							<a
								href={project.projectsRepositoryLink}
								target="_blank"
								rel="noreferrer"
							>
								<button>View Project</button>
							</a>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
