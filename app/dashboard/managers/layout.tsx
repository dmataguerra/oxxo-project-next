import ManagerCards from "./_components/ManagerCards";
export default function LayoutManagers ({children, count} : {children : React.ReactNode, count : React.ReactNode}) {
    return (
    <div className="flex flex-row h-full">
        <div className="w-4/12 overflow-y-auto">
            <ManagerCards/>
        </div>
        <div className="flex-1 overflow-y-auto bg-red-50">
            {children} {count}
        </div>

    </div>
    )
}