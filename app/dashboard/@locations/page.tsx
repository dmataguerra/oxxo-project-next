import axios from "axios";
import { cookies, headers } from 'next/headers';
import { TOKEN_NAME } from "../../../constants";
import { Location } from "../../../entities";
import SelectLocation from "./_components/SelectLocation";

const LocationsPage = async () => {
    const userCookies = cookies();
    const token = userCookies.get(TOKEN_NAME)?.value
    const { data } = await axios.get<Location[]>("http://127.0.0.1:4000/locations", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return (<div className="w-8/12">
        <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
            <div className="w-1/2">
                <SelectLocation locations={data} />
            </div>
            
        </div>

    </div>)
}


export default LocationsPage;