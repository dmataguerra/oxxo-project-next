"use client"; // This is a client component
import {ReactNode} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
    icon: ReactNode;
    path: string;
}

const NavItem = ({icon , path} : NavItemProps) => {
    const pathName = usePathname();
    return (
        <Link href={path} className={pathName === path ? "bg-orange-400 w-full flex justify-center transition-color" : ""}>
        {icon}
        </Link>
    )
}

export default NavItem;