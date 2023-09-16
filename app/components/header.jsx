"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
// import { useEffect, useState } from "react";
// import { MdOutlineWbSunny } from "react-icons/md";
// import { RiMoonClearLine } from "react-icons/ri";

export default function Header() {
	const selectedLayoutSegment = useSelectedLayoutSegment();

	return (
		<div className="navbar bg-base-100 text-white font-semibold ">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn dark:btn-ghost lg:hidden">
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
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-xl z-10 lg:z-0"
					>
						<li>
							<Link
								href={"/stories"}
								className={
									selectedLayoutSegment === "stories"
										? "text-dark-slate-gray dark:text-jet-stream"
										: "text-gray-900 dark:text-slate-200 hover:dark:text-slate-200"
								}
							>
								Stories
							</Link>
						</li>
						<li>
							<Link
								href={"/projects"}
								className={
									selectedLayoutSegment === "projects"
										? "text-dark-slate-gray dark:text-jet-stream"
										: "text-gray-900 dark:text-slate-200 hover:dark:text-slate-200"
								}
							>
								Projects
							</Link>
						</li>
						<li>
							<Link
								href={"/about"}
								className={
									selectedLayoutSegment === "abouts"
										? "text-dark-slate-gray dark:text-jet-stream"
										: "text-gray-900 dark:text-slate-200 hover:dark:text-slate-200"
								}
							>
								About
							</Link>
						</li>
					</ul>
				</div>
				<Link
					href={"/"}
					className={
						selectedLayoutSegment === "/"
							? "text-jet-stream"
							: "text-gray-900 dark:text-slate-200 btn btn-ghost normal-case text-2xl"
					}
				>
					naufalHaidar12342
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 text-2xl">
					{/* task: add conditional rendering for each route to let user know on which page they're currently on */}
					<li>
						<Link
							href={"/stories"}
							className={
								selectedLayoutSegment === "stories"
									? "text-dark-slate-gray dark:text-jet-stream"
									: "text-gray-900 dark:text-slate-200 hover:dark:text-slate-200"
							}
						>
							Stories
						</Link>
					</li>
					<li>
						<Link
							href={"/projects"}
							className={
								selectedLayoutSegment === "projects"
									? "text-dark-slate-gray dark:text-jet-stream"
									: "text-gray-900 dark:text-slate-200 hover:dark:text-slate-200"
							}
						>
							Projects
						</Link>
					</li>
					<li>
						<Link
							href={"/about"}
							className={
								selectedLayoutSegment === "about"
									? "text-dark-slate-gray dark:text-jet-stream"
									: "text-gray-900 dark:text-slate-200 hover:dark:text-slate-200"
							}
						>
							About
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
