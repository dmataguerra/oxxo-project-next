import { Employee } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import updateEmployee from "@/actions/employees/update";

export default function FormUpdateEmployee({ employee }: { employee: Employee }) {
    const { id } = employee;
    const updateEmployeeById = updateEmployee.bind(null, id);
    return (
        <form action={updateEmployeeById} className="flex flex-col gap-2 p-8 bg-orange-500 h-fit rounded-md m-2">
            <Input name="employeeName" defaultValue={employee.employeeName} label="Nombre" />
            <Input name="employeeLastName" defaultValue={employee.employeeLastName} label="Apellido" />
            <Input name="employeeEmail" defaultValue={employee.employeeEmail} label="Email" />
            <Input name="employeePhoneNumber" defaultValue={employee.employeePhoneNumber} label="Teléfono" />
            <Input name="employeePhoto" type="file" label="Foto de empleado" accept="image/*" />
            <Button type="submit" variant="faded" color="primary">Actualizar</Button>
        </form>
    )
}