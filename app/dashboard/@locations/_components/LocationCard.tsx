import {Card, CardHeader, CardBody, Divider} from '@nextui-org/react';
import {Location} from '../../../../entities';
import axios from 'axios';
import {API_URL} from '@/constants';
import Link from 'next/link';
import { authHeaders } from '@/helpers/authHeaders';

export default async function LocationCard({store} : {store : string | string[] | undefined}) {
    if (!store || typeof store !== 'string') return null;
    const {data} = await axios.get<Location>(`${API_URL}/locations/${store}`,{
        headers: {
           ...authHeaders()
        },
        withCredentials: true
    });
    
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