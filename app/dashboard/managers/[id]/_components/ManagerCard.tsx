'use client';
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Manager } from "@/entities";
import dynamic from "next/dynamic";
import Link from "next/link";
import CreateUserManager from './CreateUserManager';


const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function ManagerCard({manager} :  {manager : Manager}) {
    return (
    <div className="flex justify-center p-8">
        <div className="w-[50%]">
            <Card className="w-full">
                <CardHeader className="w-full flex items-center justify-between">
                    <p className="w-full">Nombre: <b>{manager.managerFullName}</b></p>
                    <div className="ml-2">
                        <CreateUserManager manager={manager} />
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p className="w-full">Email: <b>{manager.managerEmail}</b></p>
                    <p className="w-full">Telefono: <b>{manager.managerPhoneNumber}</b></p>
                    <p className="w-full">Salario: <b>${manager.managerSalary}</b></p>
                    {manager.location && (
                        <>
                            <p className="w-full mt-2">Tienda: <Link href={`/dashboard?store=${manager.location.locationId}`}><b className="text-blue-600 hover:underline">{manager.location.locationName}</b></Link></p>
                            <div className="relative z-0">
                                <Map
                                    coordinates={manager.location.locationLating}
                                    locationName={manager.location.locationName}
                                />
                            </div>
                        </>
                    )}
                </CardBody>
            </Card>
        </div>
    </div>
    )
}