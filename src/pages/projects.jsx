import Layout from "@/components/Layout";
import Link from "next/link";

export default function Projects() {
	return (
		<Layout pageTitle="Projects">
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold text-warning">Oh hi there!</h1>
						<p className="py-6">
							Currently, I&apos;m still developing this part of the website. I
							know, i know, this is such a bummer. But, you can check other
							section of this website. Thank you!
						</p>

						<button className="btn btn-primary bg-viridian border-none hover:bg-uranian-blue hover:text-black">
							Homepage
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
}
