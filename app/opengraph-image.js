import Image from "next/image";
import { ImageResponse } from "next/server";
import { OPENGRAPH_IMAGE_SIZE } from "./constants/ogimage_size";

// declare to vercel this function executed in edge runtime to load opengraph image
export const runtime = "edge";

// image metadata
export const alt = "Cover image for naufalhaidar12342";
export const contentType = "image/webp";
export const defaultImage =
	"https://media.graphassets.com/8CG98OfRYiL1D5MsnO8g";
export const defaultImageCredits = "Photo by Desola Lanre-Ologun on Unsplash";
export const defaultImageSource = "https://unsplash.com/photos/IgUR1iX0mqM";

// image generation function
export default function OpenGraphImage() {
	const aksharRegular = fetch(
		new URL("./Akshar-Regular.ttf", import.meta.url)
	).then((res) => res.arrayBuffer());

	return (
		new ImageResponse(
			(
				<div
					style={{
						color: "black",
						background: "#F6F6F6",
						height: "100%",
						width: "100%",
						display: "flex",
						textAlign: "center",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						flexWrap: "nowrap",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							justifyItems: "center",
						}}
					>
						<Image
							src={defaultImage}
							alt={`${defaultImageCredits}`}
							width={600}
							height={500}
						/>
					</div>
					<div
						style={{
							fontSize: 60,
							fontFamily:
								"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;",
							letterSpacing: "-0.025em",
							color: "black",
							marginTop: 30,
							padding: "0 120px",
							lineHeight: 1.4,
							whiteSpace: "pre-wrap",
						}}
					>
						🌏 naufalhaidar12342
					</div>
				</div>
			)
		),
		{
			...OPENGRAPH_IMAGE_SIZE,
			fonts: [
				{
					name: "Akshar",
					data: aksharRegular,
					style: "normal",
					weight: "400",
				},
			],
		}
	);
}
