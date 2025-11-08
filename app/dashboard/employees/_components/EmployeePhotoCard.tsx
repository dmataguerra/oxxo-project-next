import {Employee } from "@/entities";
import {Button, Card, CardBody, CardHeader,Divider , Image, CardFooter} from "@nextui-org/react";
import Link from "next/link";

export default function EmployeePhotoCard ({employee} : {employee : Employee}) {
    return (
        <div className="w-[360px]">
            <Card className="w-full relative h-72 overflow-hidden" isFooterBlurred>
                <CardHeader className="absolute top-0 bg-black bg-opacity-25 w-full z-10">
                    <p className="w-full font-bold text-xl text-white drop-shadow">{employee.employeeName + " "+ employee.employeeLastName}</p>
                </CardHeader>
                <Image removeWrapper src={employee.employeePhoto} classNames={{ img : "h-72 w-full object-cover z-0"}}/>
                <CardFooter className="absolute bottom-0 py-2 h-14 w-full bg-black/30 z-10">
                    <Link href={`/dashboard/employees/${employee.id}`}>
                    <Button variant="ghost" className="text-white">Actualizar datos</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
