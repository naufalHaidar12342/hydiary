import Layout from "@/components/Layout";

export default function Home() {
	return (
		<Layout pageTitle="Home">
			<div className="flex flex-col justify-center items-center px-4 py-4">
				<div className="card lg:card-side bg-base-100 shadow-xl">
					<figure>
						<img src="/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" />
					</figure>
					<div className="card-body">
						<h2 className="card-title">New album is released!</h2>
						<p>Click the button to listen on Spotiwhy app.</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">Listen</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
