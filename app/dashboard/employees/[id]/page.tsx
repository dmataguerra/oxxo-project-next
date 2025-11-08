import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Employee } from "@/entities";
import EmployeeCard from "../_components/EmployeeCard";

export default async function EmployeePage({params} : {params: {id: string}}) {
    const response = await fetch(`${API_URL}/employees/${params.id}`, {
        headers: {
            ...authHeaders(),
        },
    });
    const employee: Employee = await response.json();
    return <EmployeeCard employee={employee} />;
}