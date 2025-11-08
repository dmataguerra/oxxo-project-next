import {Employee } from "@/entities";
import { Card, CardBody, CardHeader,Divider } from "@nextui-org/react";

export default function EmployeeCard ({employee} : {employee : Employee}) {
    return (
        <div className="flex justify-center items-center p-8">
            <div className="w-[50%]">
                <Card className="w-full">
                    <CardHeader className="w-full">
                        <p className="w-full font-bold text-xl">{employee.employeeName + " "+ employee.employeeLastName}</p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <p className="w-full">
                            Email: <b>{employee.employeeEmail}</b>
                        </p>
                        <p className="w-full">
                            Teléfono: <b>{employee.employeePhoneNumber}</b>
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}