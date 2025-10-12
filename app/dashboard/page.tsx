import EmployeesLocation from "./@locations/_components/EmployeesLocation";

export default function DashboardPage({searchParams}: { searchParams?: { [key : string]: string | string[] | undefined } }) {
    // Solo usar store si es un string válido
    const storeId = typeof searchParams?.store === 'string' ? searchParams.store : undefined;
    
    return (
        <>
            <div className="h-full w-4/12 bg-red-100">
            <div className="h-[90vh] overflow-hidden overflow-y-auto first:mt-0 last:mb-0">
               {storeId ? (
                   <EmployeesLocation store={storeId} />
               ) : (
                   <div className="p-4 text-gray-500 text-center mt-10">
                       Selecciona una ubicación para ver los empleados
                   </div>
               )}
            </div>
            </div>
        </>
    )
}