import axios from "axios";
import { cookies, headers } from 'next/headers';
import { TOKEN_NAME } from "../../../constants";
import { Location } from "../../../entities";
import SelectLocation from "./_components/SelectLocation";

const LocationsPage = async ({searchParams} : {searchParams : {[key:string] : string | string[] | undefined}}) => {
    const userCookies = cookies();
    const token = userCookies.get(TOKEN_NAME)?.value
    let { data } = await axios.get<Location[]>("http://127.0.0.1:4000/locations", {
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
    return (<div className="w-8/12">
        <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
            <div className="w-1/2">
                <SelectLocation locations={data} store={searchParams?.store}/>
            </div>
            
        </div>

    </div>)
}


export default LocationsPage;