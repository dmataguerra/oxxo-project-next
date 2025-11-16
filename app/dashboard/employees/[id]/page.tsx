import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Employee, Location } from "@/entities";
import FormUpdateEmployee from "./_components/FormUpdateEmployee";
import EmployeeDataCard from "./_components/EmployeeDataCard";
import { LuUser } from "react-icons/lu";
import CreateUser from "./_components/CreateUser";
import FormCreateUserEmployee from "./_components/FormCreateUser";

export default async function EmployeePage({ params }: { params: { id: string } }) {
    const response = await fetch(`${API_URL}/employees/${params.id}`, {
        headers: {
            ...authHeaders(),
        },
    });
    const employee: Employee = await response.json();
    const responseLocations = await fetch(`${API_URL}/locations`, {
        headers: {
            ...authHeaders(),
        },
    });
    const stores: Location[] = await responseLocations.json();
    return (
        <div className="w-full h-[90vh] flex flex-row">
            <EmployeeDataCard employee={employee}> 
            </EmployeeDataCard>
            <FormUpdateEmployee employee={employee} stores={stores} />
        </div>
    );
}