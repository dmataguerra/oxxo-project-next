import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';
import { Manager, Location } from '@/entities';
import ManagerCard from './_components/ManagerCard';
import DeleteManagerButton from './_components/DeleteManagerButton';
import UpdateManager from './_components/UpdateManager';
import FormUpdateManager from './_components/FormUpdateManager';

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
    
    // Fetch stores for the form
    const responseStores = await fetch(`${API_URL}/locations`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            tags: ["dashboard:locations"]
        }
    });
    const stores: Location[] = await responseStores.json();
    
    return (
       <div className="flex-1 overflow-y-auto bg-red-50">
            <ManagerCard manager={data}/>
            <div className="flex justify-center gap-4 pb-8">
                <UpdateManager>
                    <FormUpdateManager manager={data} stores={stores} />
                </UpdateManager>
                <DeleteManagerButton managerId={data.managerId} />
            </div>
       </div> 
    )
}