"use client";
import { Employee } from "@/entities";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import DeleteEmployee from "./DeleteEmployee";

export default function EmployeeDataCard({ employee }: { employee: Employee }) {
    return (
        <div className="flex flex-row items-center gap-2 bg-white rounded-md flex-grow-0 h-fit px-4  m-2 py-2 border-orange-300">
            <div className="text-xl flex flex-col h-full justify-between">
                <div className="h-full py-10">
                    <h1 className="font-bold">{employee.employeeName + " " + employee.employeeLastName}</h1>
                    <h1>{employee.employeeEmail}</h1>
                    <h1>{employee.employeePhoneNumber}</h1>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <Link className="underline" href={{ pathname: `/dashboard`, query: { store: String(employee.location?.locationId) } }}>
                        {employee.location?.locationName}
                    </Link>
                    <DeleteEmployee employeeId={employee.id} />
                </div>
            </div>
            <div className="h-full py-20 w-1 bg-zinc-400 mx-5" />
            <Image src={employee.employeePhoto}
                isZoomed
                className="object-cover"
                classNames={{ img: "size-60" }}
            />
        </div>
    )
}