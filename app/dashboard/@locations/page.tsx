import { Location, Manager } from "../../../entities";
import SelectLocation from "./_components/SelectLocation";
import LocationCard from "./_components/LocationCard";
import { API_URL } from "@/constants";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import { authHeaders } from "@/helpers/authHeaders";
import UpdateLocation from "./_components/UpdateLocation";
import FormUpdateLocation from "./_components/FormUpdateLocation";

const LocationsPage = async ({searchParams} : {searchParams : {[key:string] : string | string[] | undefined}}) => {
    const response = await fetch(`${API_URL}/locations`, {
        method: 'GET',
        headers: {
           ...authHeaders() 
        },
        next: {
            tags: ["dashboard:locations"]
        }
    });
    let data : Location[]= await response.json()
    data = [
        {
            locationId : 0,
            locationName : "Ninguna",
            locationAddress : "",
            locationLating : []
        },
        ...data
    ]
    
    // Verificar si hay una ubicación seleccionada y que no sea "Ninguna" (0)
    const hasSelectedLocation = searchParams?.store && 
                                 typeof searchParams.store === 'string' && 
                                 searchParams.store !== '0';
    
    // Obtener managers solo si hay ubicación seleccionada
    let managers: Manager[] = [];
    if (hasSelectedLocation) {
        const responseManagers = await fetch(`${API_URL}/managers`, {
            headers: {
                ...authHeaders()
            },
            next: {
                tags: ["dashboard:managers"]
            }
        });
        managers = await responseManagers.json();
    }
    
    return (
    <div className="flex-1 p-4 overflow-y-auto bg-red-50">
        <div className="flex flex-col items-center px-4 py-6">
            <div className="w-[30%] mb-6">
                <SelectLocation locations={data} store={searchParams?.store}/>

            </div>
            <div className="w-full flex flex-col items-center gap-4">
                <div className="w-[30%]">
                    <LocationCard store={searchParams.store}/>
                </div>
                
                {/* Si NO hay ubicación seleccionada, mostrar el formulario */}
                {!hasSelectedLocation && (
                    <div className="w-[30%]">
                        <FormNewLocation store={searchParams.store}/>
                    </div>
                )}
                
                {/* Si HAY ubicación seleccionada, mostrar botones de actualizar y eliminar */}
                {hasSelectedLocation && (
                    <div className="flex gap-4 items-center">
                        <UpdateLocation store={searchParams.store}>
                            <FormUpdateLocation store={searchParams.store} managers={managers} locations={data} />
                        </UpdateLocation>
                        <DeleteLocationButton store={searchParams.store}/>
                    </div>
                )}
            </div>
        </div>
    </div>)
}


export default LocationsPage;