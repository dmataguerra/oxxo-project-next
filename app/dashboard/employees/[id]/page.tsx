import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Employee } from "@/entities";
import EmployeeCard from "../_components/EmployeeCard";
import { Image } from "@nextui-org/react";
import FormUpdateEmployee from "./_components/FormUpdateEmployee";

export default async function EmployeePage({params} : {params: {id: string}}) {
    const response = await fetch(`${API_URL}/employees/${params.id}`, {
        headers: {
            ...authHeaders(),
        },
    });
    const employee: Employee = await response.json();
    return(
        <div className = "w-full h-[90vh] flex flex-row">
            <div>
                <EmployeeCard employee={employee}/>
                <Image src = {employee.employeePhoto}
                isZoomed
                className="object-cover"
                classNames={{img : "size-60"}}
                />
            </div>
            <FormUpdateEmployee employee={employee}/>
        </div>
    ) ;
}