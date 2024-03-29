"use client";
import { caveat } from "@/libraries/fonts";
import { Navbar, NavbarBrand, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, NavbarMenuToggle } from "@nextui-org/navbar";
import { Input } from "@nextui-org/input";

import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsMoonStars, BsSun, BsSearch } from "react-icons/bs";


export default function Header() {
	// const [mounted, setMounted] = useState(false);
	// const { theme, setTheme } = useTheme();
	const selectedPath = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pageMenu = [
		{ pageName: "Entries", pageLink: "/entries" },
		{ pageName: "About Me", pageLink: "/about" },
		{ pageName: "Projects", pageLink: "/projects" },

	]
	// useEffect(() => setMounted(true), []);
	// if (!mounted) return null;

	return (
		<Navbar className="!backdrop-filter-none bg-background/0 " shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} >
			{/* left side */}
			<NavbarContent className="">
				<NavbarMenuToggle className="sm:hidden" />
				<NavbarBrand className={`${caveat.className} `}>
					<Link className="text-5xl font-bold text-sand" href={"/"}>Hydiary</Link>
				</NavbarBrand>

			</NavbarContent>
			{/* right side */}
			<NavbarContent justify="center" className="hidden sm:flex gap-5 " >
				{pageMenu.map((page, index) => (
					<NavbarMenuItem key={index} isActive={selectedPath === page.pageLink ? true : false}  >
						<Link href={page.pageLink} className={`font-medium text-2xl ${selectedPath === page.pageLink ? "custom-active-page" : ""}`}>
							{page.pageName}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarContent>
			<NavbarMenu className="!backdrop-filter-none bg-gradient-to-b from-darkblue-gradient to-background/0">
				{pageMenu.map((page, index) => (
					<NavbarMenuItem key={index} isActive={selectedPath === page.pageLink ? true : false}>
						<Link href={page.pageLink} className="font-medium text-2xl">
							{page.pageName}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
