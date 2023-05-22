import { NextRequest } from "next/server";
const { ImageResponse } = require("@vercel/og");

export const config = {
	runtime: "edge",
};

export default function handler(request) {
	try {
		const { searchParams } = new URL(request.url);

		const hasTitle = searchParams.has("pageTitle");
		const title = hasTitle
			? searchParams.get("pageTitle")?.slice(0, 100)
			: "Naufal Haidar's blog";

		return new ImageResponse(
			(
				<div
					style={{
						backgroundColor: "black",
						backgroundSize: "150px 150px",
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
							src="https://media.graphassets.com/gOl4JN4qQX62y0LPUGRR"
							alt="Vercel logo"
							style={{ margin: "0 30px" }}
							width={400}
							height={400}
						/>
					</div>
					<div
						style={{
							fontSize: 60,
							fontStyle: "normal",
							letterSpacing: "-0.025em",
							color: "white",
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
			{ width: 1200, height: 630 }
		);
	} catch (error) {
		console.error(`error open graph image generation= ${error.message}`);
		console.log(`error open graph image generation= ${error.message}`);
		return new Response("Failed to generate the image for link preview", {
			status: 500,
		});
	}
}
