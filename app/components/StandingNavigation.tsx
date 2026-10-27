"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StandingNavigation() {
  const currentPath = usePathname();
  const navigationPaths = [
    {
      name: "Home",
      address: "/",
    },
    {
      name: "Entries",
      address: "/entries",
    },
    {
      name: "About",
      address: "/about",
    },
  ];
  return (
    <nav className="hidden lg:flex flex-col items-end h-[50vh] w-fit px-6 py-4 gap-y-6 font-(family-name:--font-ibm-plex-mono) text-3xl font-medium">
      {navigationPaths.map((item) => (
        <Link
          key={item.name}
          href={`${item.address}`}
          className={`flex items-center transition-transform duration-150 hover:translate-x-2`}
        >
          {item.name}
          <Bookmark
            className={`${currentPath === item.address ? "text-hydiary-accent" : "flex"} -rotate-90 size-10 transition-all duration-200 ease-in`}
          />
        </Link>
      ))}
    </nav>
  );
}
