"use client";
import createEmployee from "@/actions/employees/create";
import SelectLocation from "./SelectLocation";
import { Location } from "@/entities";
import { Button, Input } from "@nextui-org/react";

export default function FormCreateEmployee({ locations }: { locations: Location[] }) {
    return (
        <form
            action={createEmployee}
            encType="multipart/form-data"
            className="flex flex-col gap-2 p-8 bg-orange-500 h-fit rounded-md m-2"
        >
            <Input isRequired name="employeeName" placeholder="David" />
            <Input isRequired name="employeeLastName" placeholder="Mata Guerra" />
            <Input isRequired name="employeeEmail" placeholder="dmataguerra@gmail.com" />
            <Input
                isRequired
                name="employeePhoneNumber"
                placeholder="473780XXXX"
                maxLength={10}
                inputMode="numeric"
            />
            <Input  name="employeePhoto" type="file" accept="image/*" />
            <SelectLocation stores={locations} defaultStore={undefined}/>
            <Button type="submit" variant="faded" color="primary">Crear Empleado</Button>
        </form>
    )
}