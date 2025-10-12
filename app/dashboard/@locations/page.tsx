import { Location } from "../../../entities";
import SelectLocation from "./_components/SelectLocation";
import LocationCard from "./_components/LocationCard";
import { API_URL } from "@/constants";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import { authHeaders } from "@/helpers/authHeaders";

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
    
    return (
    <div className="w-7/12">
        <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
            <div className="w-1/2 my-10">
                <SelectLocation locations={data} store={searchParams?.store}/>

            </div>
            <div>
                <div className="w-8/12">
                    <LocationCard store={searchParams.store}/>
                </div>
                
                {/* Si NO hay ubicación seleccionada, mostrar el formulario */}
                {!hasSelectedLocation && (
                    <div className="w-20/12">
                        <FormNewLocation store={searchParams.store}/>
                    </div>
                )}
                
                {/* Si HAY ubicación seleccionada, mostrar el botón de eliminar */}
                {hasSelectedLocation && (
                    <DeleteLocationButton store={searchParams.store}/>
                )}
            </div>
        </div>
    </div>)
}


export default LocationsPage;