"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const pathname = usePathname();
  const [width, setwiddth] = useState(0);
  useEffect(() => {
    setwiddth(window.innerWidth);
    window.addEventListener("resize", () => {
      setwiddth(window.innerWidth);
    });
  }, []);

  if (width >= 768) {
    return (
      <nav
        className="flex justify-between items-center sticky h-16 bg-black w-full text-white top-0 shadow-sm shadow-gray-500"
        role="navigation"
      >
        <div>
          <h1 className="pl-8">
            <Link className="text-2xl font-bold" href="/">
              Team Selector
            </Link>
          </h1>
        </div>
        <div className="pr-8">
          <ul className="flex justify-between items-center">
            <li className="  p-4 w-24 flex justify-center items-center">
              <Link className={pathname === "/" ? "font-semibold underline underline-offset-8 decoration-blue-500 decoration-2 text-base" : "hover:font-semibold text-base"} href="/">
                Home
              </Link>
            </li>
            <li className="  p-4 w-24 flex justify-center items-center">
              <Link className={pathname === "/about" ? "font-semibold underline underline-offset-8 decoration-blue-500 decoration-2 text-base" : "hover:font-semibold text-base"} href="/about">
                About
              </Link>
            </li>
            <li className="  p-4 w-24 flex justify-center items-center">
              <Link className={pathname === "/selector" ? "font-semibold underline underline-offset-8 decoration-blue-500 decoration-2 text-base" : "hover:font-semibold text-base"} href="/selector">
                Selector
              </Link>
            </li>
            <li className=" p-4 w-24 flex justify-center items-center">
              <Link className={pathname === "/contact" ? "font-semibold underline underline-offset-8 decoration-blue-500 decoration-2 text-base" : "hover:font-semibold text-base"} href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav
      className="flex justify-between items-center sticky h-12 bg-black w-full text-white top-0 shadow-sm shadow-gray-500"
      role="navigation"
    >
      <div>
        <h1 className="pl-4">
          <Link className="text-base font-bold" href="/">
            Team Selector
          </Link>
        </h1>
      </div>
      <div className="pr-4">
        <NavigationMenu className="dark">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild><Link href="/">Home</Link></NavigationMenuLink>
                <NavigationMenuLink asChild><Link href="/about">About</Link></NavigationMenuLink>
                <NavigationMenuLink asChild><Link href="/selector">Selector</Link></NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
