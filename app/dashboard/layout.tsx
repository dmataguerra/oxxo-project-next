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
        <div className="bg-orange-50 h-screen flex flex-col">
            <Header />
            <div className="flex flex-row flex-1 overflow-hidden">
                <SideBar />
                <div className="flex-1 overflow-y-auto">
                    {children}
                    {path === '/dashboard' ? locations : null}
                </div>           
            </div>
        </div>
    )
}