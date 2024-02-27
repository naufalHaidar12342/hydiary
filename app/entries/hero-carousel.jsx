"use client";

import HygraphDateToReadableDate from "@/libraries/date-converter";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { RxDividerHorizontal } from "react-icons/rx";

export default function HeroCarousel({ heroDatas }) {
	console.log("herodatas", heroDatas);
	// const [heroDataDeconstructed] = heroDatas;
	// console.log("herodatas deconstructed", heroDataDeconstructed);
	// const [sliderRef] = useKeenSlider(
	// 	{
	// 		loop: true,
	// 		defaultAnimation: {
	// 			duration: 1000,
	// 		},
	// 	},
	// 	[
	// 		(slider) => {
	// 			let timeout;
	// 			let mouseOver = false;
	// 			function clearNextTimeout() {
	// 				clearTimeout(timeout);
	// 			}
	// 			function setNextTimeout() {
	// 				clearNextTimeout();
	// 				timeout = setTimeout(() => {
	// 					if (!mouseOver) {
	// 						slider.next();
	// 					}
	// 				}, 2500);
	// 			}
	// 			slider.on("created", () => {
	// 				slider.container.addEventListener("mouseover", () => {
	// 					mouseOver = true;
	// 					clearNextTimeout();
	// 				});
	// 				slider.container.addEventListener("mouseout", () => {
	// 					mouseOver = false;
	// 					setNextTimeout();
	// 				});
	// 				setNextTimeout();
	// 			});
	// 			slider.on("dragStarted", clearNextTimeout);
	// 			slider.on("animationEnded", setNextTimeout);
	// 			slider.on("updated", setNextTimeout);
	// 		},
	// 	]
	// );

	return (
		<div className="h-[55vh] w-full">
			<div className="w-full h-full bg-gradient-to-b from-darkblue-gradient via-indigo-950 to-inherit">
				<Swiper
					autoplay={{
						delay: 3400,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Autoplay, Pagination, Navigation]}
					className="h-full w-full mix-blend-screen"
				>
					{heroDatas.map((heroData) => (
						<SwiperSlide className="w-full h-full" key={heroData.title}>
							<Image
								src={
									heroData.postAttribution.attributionImage.url !== null
										? heroData.postAttribution.attributionImage.url
										: heroData.coverImage.url
								}
								alt={`Cover image for one of Hydiary's entries, titled "${heroData.title}"`}
								style={{ objectFit: "cover" }}
								fill
								className="opacity-50"
								priority={true}
							/>
							<div className="absolute bottom-16 lg:bottom-20 left-16 lg:left-60 z-30">
								<Link
									href={`entries/${heroData.slug}`}
									className="text-4xl font-semibold"
								>
									{heroData.title}
								</Link>
								<div className="flex items-center font-normal text-xl pt-3">
									<RxDividerHorizontal className="" />
									<span>{HygraphDateToReadableDate(heroData.date)}</span>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
