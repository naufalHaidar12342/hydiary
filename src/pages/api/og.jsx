import { NextRequest } from "next/server";
const { ImageResponse } = require("@vercel/og");

export const config = {
	runtime: "edge",
};

export default async function handler(request) {
	try {
		const { searchParams } = request.nextUrl;

		const hasTitle = searchParams.has("pageTitle");
		const title = hasTitle
			? searchParams.get("pageTitle")?.slice(0, 100)
			: "Naufal Haidar's blog";
		const hasThumbnail = searchParams.has("thumbnail");
		const thumbnail = hasThumbnail
			? searchParams.get("thumbnail")
			: "https://media.graphassets.com/gOl4JN4qQX62y0LPUGRR";
		return new ImageResponse(
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
						<img
							src={thumbnail}
							alt="Logo of article"
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
						{title}
					</div>
				</div>
			),
			{ width: 1200, height: 640 }
		);
	} catch (error) {
		console.error(`error open graph image generation= ${error.message}`);
		console.log(`error open graph image generation= ${error.message}`);
		return new Response("Failed to generate the image for link preview", {
			status: 500,
		});
	}
}
