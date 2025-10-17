import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { Manager } from '@/entities';

export default async function ManagerPage(
    { params }: {
        params:
        {
            id: string;
        }
    }) {
    const response = await fetch(`${API_URL}/managers/${params.id}`, {
        headers: {
            ...authHeaders(),
        },
        next : {
            tags: [`dashboard:managers:${params.id}`, `dashboard:managers`]
        }
    })
    const data: Manager = await response.json()
    return (
        <Card className="mx-10 py-2 bg-orange-50">
            <CardHeader className="w-full">
                <p className="w-full">Nombre: <b>{data.managerFullName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full">Email: <b>{data.managerEmail}</b></p>
                <p className="w-full">Telefono: <b>{data.managerPhoneNumber}</b></p>
            </CardBody>

        </Card>
    )
}