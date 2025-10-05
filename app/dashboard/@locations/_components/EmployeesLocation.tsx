import {Employee} from '@/entities';
import axios from 'axios';
import {API_URL} from '@/constants';
import {cookies} from 'next/headers';
import {TOKEN_NAME} from '../../../../constants';

export default async function EmployeesLocation({store}: {store: string}) {
    const allCookies = cookies();
    const tokenCookie = allCookies.get(TOKEN_NAME)?.value;
    
    // Extraer el JWT real del objeto JSON
    let actualToken = tokenCookie;
    if (tokenCookie?.startsWith('j:')) {
        const parsedCookie = JSON.parse(tokenCookie.substring(2));
        actualToken = parsedCookie.token;
    }
    
    const {data} = await axios.get<Employee[]>(`${API_URL}/employees/locations/${store}`,{
        headers: {
            Authorization: `Bearer ${actualToken}`
        },
        withCredentials: true
    });
    
    return data.map((employee) => {
        return <div key={employee.id} className="p-2 border-b">{employee.employeeName}</div>;
    });
}