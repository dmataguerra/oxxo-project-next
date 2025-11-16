"use client";
import { Employee, Location } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import updateEmployee from "@/actions/employees/update";
import SelectLocation from "../../_components/SelectLocation";

export default function FormUpdateEmployee({ employee, stores }: { employee: Employee, stores: Location[] }) {
    return (
        <form action={updateEmployee} className="flex flex-col gap-2 p-8 bg-orange-500 h-fit rounded-md m-2">
            <input type="hidden" name="id" value={employee.id} />
            <Input name="employeeName" defaultValue={employee.employeeName} label="Nombre" />
            <Input name="employeeLastName" defaultValue={employee.employeeLastName} label="Apellido" />
            <Input name="employeeEmail" defaultValue={employee.employeeEmail} label="Email" />
            <Input
                name="employeePhoneNumber"
                defaultValue={employee.employeePhoneNumber}
                label="Teléfono"
                maxLength={10}
                inputMode="numeric"
            />
            <SelectLocation stores={stores} defaultStore={employee.location?.locationId} />
            <Input name="employeePhoto" type="file" accept="image/*" />
            <Button type="submit" variant="faded" color="primary">Actualizar</Button>
        </form>
    )
}