import { LuStore , LuUser, LuUsers, LuTruck, LuWheat }  from "react-icons/lu";
import NavItem from "./NavItem";

export default function SideBar(){
    return (
        <nav className="w-[6vw] h-full bg-orange-200 flex flex-col items-center py-20 justify-center gap-20">
            <NavItem icon={<LuStore className="text-4xl"/>} path="/dashboard"/>
            <NavItem icon={<LuStore className="text-4xl"/>} path="/dashboard/providers"/>
            <NavItem icon={<LuStore className="text-4xl"/>} path="/dashboard/employees"/>
            <NavItem icon={<LuStore className="text-4xl"/>} path="/dashboard/managers"/>
            <NavItem icon={<LuStore className="text-4xl"/>} path="/dashboard/products"/>
        </nav>
    )
}