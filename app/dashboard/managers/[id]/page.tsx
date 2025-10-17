import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';
import { Manager } from '@/entities';
import ManagerCard from './_components/ManagerCard';

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
    const data: Manager = await response.json();
    return (
       <div className="flex-1 p-4 overflow-y-auto bg-red-50">
        <ManagerCard manager={data}/>
       </div> 
    )
}