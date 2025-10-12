import {Card, CardHeader, CardBody, Divider} from '@nextui-org/react';
import {API_URL} from '@/constants';
import Link from 'next/link';
import { authHeaders } from '@/helpers/authHeaders';

export default async function LocationCard({store} : {store : string | string[] | undefined}) {
    if (!store || typeof store !== 'string') return null;
    const response = await fetch(`${API_URL}/locations/${store}`,{
        method: 'GET',
        headers: {
           ...authHeaders()
        },
        next: {
            tags: ["dashboard:locations", `dashboard:locations:${store}`]
        }
   });
    const data = await response.json();
    return (
        <Card>
            <CardHeader>
                <b>Tienda: {data.locationName}</b>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>Manager: <Link href={{pathname: '/dashboard/managers'}}><b>{data.manager?.managerFullName}</b></Link></p>
            </CardBody>
        </Card>
    )
}