import { Manager } from '@/entities';
import { API_URL } from '@/constants';
import { Card } from '@nextui-org/react';
import { CardHeader, CardBody } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import { authHeaders } from '@/helpers/authHeaders';
import Link from 'next/link';
export default async function ManagerCards() {     
    const response = await fetch(`${API_URL}/managers`, {
        method: 'GET',
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:managers"]
        }
    });
    const data: Manager[] = await response.json();
    
    return data.map((manager: Manager) => {
        return (
        <Link href={{pathname : `/dashboard/managers/${manager.managerId}`}}>
        <Card className="mx-10 my-10 hover:scale-[105%] hover : bg-blue-100">
            <CardHeader>
                <p className="w-full">Nombre:<b> {manager.managerFullName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody>

                <p className="w-full">Email:<b> {manager.managerEmail}</b>
                </p>
                <p className="w-full">Telefono:<b> {manager.managerPhoneNumber}</b></p>
            </CardBody>
        </Card>
        </Link>
        )
    });
}