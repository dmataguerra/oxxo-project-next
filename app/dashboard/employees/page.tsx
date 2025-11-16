import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Employee, Location } from "@/entities";
import ListEmployees from "./_components/ListEmployees";

const EmployeesPage = async () => {
    const response = await fetch(`${API_URL}/employees`, {
        headers: {
            ...authHeaders(),
        },
    })
    const employees: Employee[] = await response.json();
    const responseLocations = await fetch(`${API_URL}/locations`, {
        headers: {
            ...authHeaders(),
        },
    });
    const locations: Location[] = await responseLocations.json();
     return (
         <div className = "flex flex-col flex-grow-0 h-[90vh] gap-4 overflow-y-auto p-10">
            <ListEmployees employees={employees} locations={locations} />
         </div>
     )
}

export default EmployeesPage;