import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Employee } from "@/entities";
import EmployeeCard from "./_components/EmployeeCard";
const EmployeesPage = async () => {
    const response = await fetch(`${API_URL}/employees`, {
        headers: {
            ...authHeaders(),
        },
    })
    const employees: Employee[] = await response.json();
    return (
        <>
        {
            employees.map((employee: Employee) => {
                return( 
                <EmployeeCard key = {employee.id} employee = {employee} />
                )
            })
        }
        </>
    )
}

export default EmployeesPage;