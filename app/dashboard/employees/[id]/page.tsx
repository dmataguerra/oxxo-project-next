import EmployeeCard from "../_components/EmployeeCard";

export default async function EmployeePage({params} : {params: {id: string}}) {
    return <EmployeeCard employee={employee} />; 
}