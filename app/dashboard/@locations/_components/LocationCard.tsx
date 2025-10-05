import {Card, CardHeader, CardBody, Divider} from '@nextui-org/react';
import {Location} from '../../../../entities';
import { TOKEN_NAME } from '@/constants';
import {cookies} from 'next/headers';
import axios from 'axios';
import {API_URL} from '@/constants';
import Link from 'next/link';

export default async function LocationCard({store} : {store : string | string[] | undefined}) {
    if (!store || typeof store !== 'string') return null;
    
    const tokenCookie = cookies().get(TOKEN_NAME)?.value;
    let actualToken = tokenCookie;
    if (tokenCookie?.startsWith('j:')) {
        const parsedCookie = JSON.parse(tokenCookie.substring(2));
        actualToken = parsedCookie.token;
    }
    
    const {data} = await axios.get<Location>(`${API_URL}/locations/${store}`,{
        headers: {
            Authorization: `Bearer ${actualToken}`
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