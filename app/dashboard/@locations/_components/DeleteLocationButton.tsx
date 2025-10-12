import deleteLocation from "@/actions/locations/delete";
import {Button} from "@nextui-org/react"
import { LuTrash } from "react-icons/lu";

export default function DeleteLocationButton({store} : {store : string | string[] | undefined}) {
    if (!store) return null;
    return (
        <form action={deleteLocation} className="my-4">
            <input type="hidden" name="deleteValue" value={store} />
            <Button type="submit" color="danger">
               <LuTrash />
            </Button>
        </form>
    )
}