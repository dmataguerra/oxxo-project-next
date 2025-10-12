import { Input } from "@nextui-org/react"
import { createLocation } from "@/actions/locations/create";
import axios from "axios";
import { API_URL, TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import SelectManager from "./SelectManager";
import DeleteLocation from "@/actions/locations/delete";
import {Button} from "@nextui-org/react";
export default async function FormNewLocation({store} : {store:string | string[] | undefined}) {
    if(store) return null;
    const tokenCookie = cookies().get(TOKEN_NAME)?.value;
    let actualToken = tokenCookie;
    if (tokenCookie?.startsWith('j:')) {
        const parsedCookie = JSON.parse(tokenCookie.substring(2));
        actualToken = parsedCookie.token;
    }

    const responseManager = await axios.get(`${API_URL}/managers`,{
        headers : {
            Authorization : `Bearer ${actualToken}`
        },
        withCredentials: true
    })
    const responseLocation = await axios.get(`${API_URL}/locations`,{
        headers : {
            Authorization : `Bearer ${actualToken}`
        },
        withCredentials: true
    })
    return (
        <form action={createLocation} className="bg-orange-400 py-2 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-xl text-white text-center">Crear Tienda</h1>
            <Input label="Nombre de la tienda" placeholder="Oxxo-Juriquilla" name="locationName" />
            <Input label="Direccion" placeholder="Avenida de la Luz" name="locationAddress" />
            <Input label="Latitud" placeholder="-120"name="locationLat" />
            <Input label="Longitud" placeholder="200" name="locationLng" />
            <SelectManager managers ={responseManager.data} locations={responseLocation.data}/>
            <Button type="submit" color="primary"> Subir </Button>
        </form>
    );
}