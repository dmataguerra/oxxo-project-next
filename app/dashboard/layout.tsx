'use client';
import Header from "./_components/Header";
import SideBar from "./_components/_sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function LayoutDasboard({
    children,
    locations
}: Readonly<{
    children: React.ReactNode;
    locations: React.ReactNode;
}>) {
    const path = usePathname();
    return (
        <div className="bg-orange-50">
            <Header />
            <div className="flex flex-row items-center">
                <SideBar />
                {children}
                {path === '/dashboard' ? locations : null}           
            </div>
        </div>
    )
}