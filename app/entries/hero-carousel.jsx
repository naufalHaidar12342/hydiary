"use client";

import HygraphDateToReadableDate from "@/libraries/date-converter";
import Image from "next/image";
import Link from "next/link";
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
			<div className="w-full h-full bg-linear-to-b from-darkblue-gradient via-indigo-950 to-inherit"></div>
		</div>
	);
}
