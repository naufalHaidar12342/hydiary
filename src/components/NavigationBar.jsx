import Link from "next/link";

export default function NavigationBar() {
	return (
		<div className="navbar bg-viridian text-white font-medium ">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-2xl"
					>
						<li>
							<Link
								href={"/blogposts/all-post"}
								className="active:bg-uranian-blue active:text-slate-800"
							>
								Posts
							</Link>
						</li>
						<li>
							<Link
								href={"/projects"}
								className="active:bg-uranian-blue active:text-slate-800"
							>
								Projects
							</Link>
						</li>
						<li>
							<Link
								href={"/about"}
								className="active:bg-uranian-blue active:text-slate-800"
							>
								About
							</Link>
						</li>
					</ul>
				</div>
				<Link href={"/"} className="btn btn-ghost normal-case text-2xl">
					naufalHaidar12342
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 text-3xl ">
					<li>
						<Link
							href={"/blogposts/all-post"}
							className="active:bg-uranian-blue active:text-slate-800"
						>
							Posts
						</Link>
					</li>
					<li>
						<Link
							href={"/projects"}
							className="active:bg-uranian-blue active:text-slate-800"
						>
							Projects
						</Link>
					</li>
					<li>
						<Link
							href={"/about"}
							className="active:bg-uranian-blue active:text-slate-800"
						>
							About
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
