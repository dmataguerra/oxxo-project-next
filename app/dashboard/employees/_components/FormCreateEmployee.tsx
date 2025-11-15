"use client";
import { Button, Input } from "@nextui-org/react";
import createEmployee from "@/actions/employees/create";

export default function FormCreateEmployee() {
    return (
        <form action={createEmployee} encType="multipart/form-data" className="flex flex-col gap-2 p-8 bg-orange-500 h-fit rounded-md m-2" onSubmit={e => {console.log('Form submit event', e);}}>
            <Input isRequired name="employeeName" placeholder="David" />
            <Input isRequired name="employeeLastName" placeholder="Mata Guerra" />
            <Input isRequired name="employeeEmail" placeholder="dmataguerra@gmail.com" />
            <Input isRequired name="employeePhoneNumber" placeholder="473780XXXX" />
            {/* Usar input nativo para archivos para evitar problemas */}
            <input  name="employeePhoto" type="file" accept="image/*" />
            <Button type="submit" variant="faded" color="primary">Crear Empleado</Button>
        </form>
    )
}