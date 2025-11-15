import { Employee } from "@/entities";
import { Button, Input } from "@nextui-org/react";

export default function FormUpdateEmployee({employee} : {employee : Employee}) {
    return (
        <form className="flex flex-col gap-2 p-8 bg-orange-500 h-fit rounded-md m-2">
            <Input name = "Name" defaultValue = {employee.employeeName} label="Nombre" />
            <Input name = "LastName" defaultValue = {employee.employeeLastName} label="Apellido"/>
            <Input name = "Email" defaultValue = {employee.employeeEmail} label="Email"/>
            <Input name = "PhoneNumber" defaultValue = {employee.employeePhoneNumber} label="Teléfono"/>
            <Input name = "Photo" type="file" label="Foto de empleado" defaultValue = {employee.employeePhoto}/>
            <Button type="submit" variant="faded" color="primary">Actualizar</Button>
        </form>
    )
}