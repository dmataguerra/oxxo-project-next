import Header from "./_components/Header";
import SideBar from "./_components/_sidebar/Sidebar";

export default function LayoutDasboard({
    children,
    count
}: Readonly<{
    children: React.ReactNode;
    count: React.ReactNode;
}>) {
    return (
        <div className="bg-orange-50">
            <Header />
            <div className="flex flex-row items-center">
            <SideBar />
            {children}
            {count}
            </div>
        </div>
    )
}