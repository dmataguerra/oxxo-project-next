import {Employee } from "@/entities";
import { Card, CardBody, CardHeader,Divider , CardFooter, Button} from "@nextui-org/react";
import Link from "next/link";

export default function EmployeeCard ({employee} : {employee : Employee}) {
    return (
        <div className="w-[360px]">
            <Card className="w-full relative h-72 bg-orange-50">
                <CardHeader className="w-full">
                    <p className="w-full font-bold text-xl">{employee.employeeName + " "+ employee.employeeLastName}</p>
                </CardHeader>
                <Divider/>
                <CardBody className="pb-16">
                    <p className="w-full">
                        Email: <b>{employee.employeeEmail}</b>
                    </p>
                    <p className="w-full">
                        Teléfono: <b>{employee.employeePhoneNumber}</b>
                    </p>
                </CardBody>
                <CardFooter className = "absolute bottom-0 py-2 h-14 w-full">
                    <Link href={`/dashboard/employees/${employee.id}`}>
                    <Button variant="ghost">Actualizar datos</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}