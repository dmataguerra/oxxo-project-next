import Header from "./_components/Header";
import SideBar from "./_components/_sidebar/Sidebar";

export default function LayoutDasboard({
    children,
    locations
}: Readonly<{
    children: React.ReactNode;
    locations: React.ReactNode;
}>) {
    return (
        <div className="bg-orange-50">
            <Header />
            <div className="flex flex-row items-center">
                <SideBar />
                {children}
                {locations}
            </div>
        </div>
    )
}