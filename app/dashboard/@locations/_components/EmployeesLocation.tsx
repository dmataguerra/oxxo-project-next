import { Employee } from '@/entities';
import { API_URL } from '@/constants';
import { Card } from '@nextui-org/react';
import { CardHeader, CardBody } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import { authHeaders } from '@/helpers/authHeaders';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default async function EmployeesLocation({ store }: { store: string | string[] | undefined }) {     
    const response = await fetch(`${API_URL}/employees/locations/${store}`, {
        method: 'GET',
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:locations:employees"]
        }
    });
    const data: Employee[] = await response.json();
    return data.map((employee: Employee) => {
        const fullName = employee.employeeName + ' ' + employee.employeeLastName;
        return <Card key={employee.id} className="mx-10 my-10">
            <CardHeader>
                <p className="w-full">Nombre:<b> {fullName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full">Email:<b> {employee.employeeEmail}</b></p>
                <p className="w-full">Telefono:<b> {employee.employeePhoneNumber}</b></p>
                {employee.location && (
                    <>
                        <p className="w-full mt-2">Tienda: <b>{employee.location.locationName}</b></p>
                        <Map 
                            key={`${employee.location.locationId}-${employee.location.locationLating[0]}-${employee.location.locationLating[1]}`}
                            coordinates={employee.location.locationLating} 
                            locationName={employee.location.locationName}
                        />
                    </>
                )}
            </CardBody>
        </Card>
    });
}