"use client";
import { caveat } from "@/libraries/fonts";
import { Navbar, NavbarBrand, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, NavbarMenuToggle } from "@nextui-org/navbar";
import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";


export default function Header() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const selectedPath = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pageMenu = [
		{ pageName: "Entries", pageLink: "/entries" },
		{ pageName: "Projects", pageLink: "/projects" },
		{ pageName: "About", pageLink: "/about" },

	]
	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	return (
		<Navbar className="bg-none backdrop-saturate-0 bg-background/0" shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} >
			{/* left side */}
			<NavbarContent className="">
				<NavbarMenuToggle aria-label={isMenuOpen ? "close menu" : "open menu"} className="sm:hidden" />
				<NavbarBrand className={`${caveat.className} `}>
					<Link className="text-5xl font-bold text-sand" href={"/"}>Hydiary</Link>
				</NavbarBrand>
			</NavbarContent>
			{/* right side */}
			<NavbarContent justify="center" className="hidden sm:flex gap-5 " >
				{pageMenu.map((page, index) => (
					<NavbarMenuItem key={index} active={selectedPath === page.pageLink}>
						<Link href={page.pageLink} className="font-medium text-2xl">
							{page.pageName}
						</Link>
					</NavbarMenuItem>
				))}

				<NavbarItem>
					{/* <Switch
						checked={theme === "dark"}
						onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
						aria-label="Dark mode"
						uncheckedIcon={<BsSun />}
						checkedIcon={<BsMoonStars />}
					/> */}
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu className="bg-gradient-to-b from-darkblue-gradient to-dark-gradient">
				{pageMenu.map((page, index) => (
					<NavbarMenuItem key={index} active={selectedPath === page.pageLink}>
						<Link href={page.pageLink} className="font-medium text-2xl">
							{page.pageName}
							{console.log("isi index=", index)}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
