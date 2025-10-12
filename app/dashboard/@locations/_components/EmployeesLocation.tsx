import { Employee } from '@/entities';
import { API_URL } from '@/constants';
import { cookies } from 'next/headers';
import { TOKEN_NAME } from '../../../../constants';
import { Card } from '@nextui-org/react';
import { CardHeader, CardBody } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import { authHeaders } from '@/helpers/authHeaders';

export default async function EmployeesLocation({ store }: { store: string | string[] | undefined }) {
    const allCookies = cookies();
    const tokenCookie = allCookies.get(TOKEN_NAME)?.value;

    // Extraer el JWT real del objeto JSON
    let actualToken = tokenCookie;
    if (tokenCookie?.startsWith('j:')) {
        const parsedCookie = JSON.parse(tokenCookie.substring(2));
        actualToken = parsedCookie.token;
    }

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
        return <Card className="mx-10 my-10">
            <CardHeader>
                <p className="w-full">Nombre:<b> {fullName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody>

                <p className="w-full">Email:<b> {employee.employeeEmail}</b></p>
                <p className="w-full">Telefono:<b> {employee.employeePhoneNumber}</b></p>
            </CardBody>
        </Card>
    });
}