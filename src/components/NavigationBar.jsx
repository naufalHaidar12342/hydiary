import Link from "next/link";
import { useRouter } from "next/router";

export default function NavigationBar() {
	const router = useRouter();
	return (
		<div className="navbar bg-dark-slate-gray text-white font-semibold ">
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
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-dark-slate-gray rounded-box w-52 text-xl"
					>
						<li>
							<Link
								href={"/blogposts/all-post"}
								className="active:bg-amazon-green active:text-white"
							>
								Posts
							</Link>
						</li>
						<li>
							<Link
								href={"/projects"}
								className="active:bg-amazon-green active:text-white"
							>
								Projects
							</Link>
						</li>
						<li>
							<Link
								href={"/about"}
								className="active:bg-amazon-green active:text-white"
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
				<ul className="menu menu-horizontal px-1 text-2xl">
					<li className={router.pathname === "/blogposts/all-post" ? "" : ""}>
						<Link
							href={"/blogposts/all-post"}
							className={"active:bg-jet-stream active:text-black "}
						>
							Posts
						</Link>
					</li>
					<li>
						<Link
							href={"/projects"}
							className={"active:bg-jet-stream active:text-black"}
						>
							Projects
						</Link>
					</li>
					<li>
						<Link
							href={"/about"}
							className={"active:bg-jet-stream active:text-black"}
						>
							About
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
