import {Card, CardHeader, CardBody, Divider} from '@nextui-org/react';
import {API_URL} from '@/constants';
import Link from 'next/link';
import { authHeaders } from '@/helpers/authHeaders';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

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
        <div className="w-full">
        <Card className="w-full">
            <CardHeader>
                <b>Tienda: {data.locationName}</b>
            </CardHeader>
            <Divider/>
            <CardBody className="flex flex-col gap-4">
                <p>Manager: <Link href={{pathname: `/dashboard/managers/${data.manager?.managerId}`}}><b>{data.manager?.managerFullName}</b></Link></p>
                
                {data.locationLating && data.locationLating.length === 2 && (
                    <>
                        <p className="text-sm text-gray-600">
                            Coordenadas: {data.locationLating[0]}, {data.locationLating[1]}
                        </p>
                        <div className="w-full h-[300px] rounded-lg overflow-hidden">
                            <Map 
                                key={`${data.locationId}-${data.locationLating[0]}-${data.locationLating[1]}`}
                                coordinates={data.locationLating} 
                                locationName={data.locationName} 
                            />
                        </div>
                    </>
                )}
            </CardBody>
        </Card>
        </div>
    )
}