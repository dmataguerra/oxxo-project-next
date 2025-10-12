import axios from "axios";
import { cookies, headers } from 'next/headers';
import { TOKEN_NAME } from "../../../constants";
import { Location } from "../../../entities";
import SelectLocation from "./_components/SelectLocation";
import LocationCard from "./_components/LocationCard";
import { API_URL } from "@/constants";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";

const LocationsPage = async ({searchParams} : {searchParams : {[key:string] : string | string[] | undefined}}) => {
    const userCookies = cookies();
    const token = userCookies.get(TOKEN_NAME)?.value
    let { data } = await axios.get<Location[]>(`${API_URL}/locations`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
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