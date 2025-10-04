import Header from "./_components/header";
import SideBar from "./_components/sidebar";

export default function LayoutDasboard({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="bg-orange-50">
            <Header />
            <div className="flex flex-row items-center">
            <SideBar />
            {children}
            </div>
        </div>
    )
}