"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { Location } from "../../../../entities";
import { useRouter } from "next/navigation";

export default function SelectLocation(
    { locations , store 

    }: 
    { locations: Location[] , store? : string | string[] | undefined 

    }) 
    
    {
       
    const router = useRouter();
    return (
        <Select placeholder="Selecciona una ubicación" 
            classNames={{    
            mainWrapper: "hover:ring-2 ring-red-200 rounded xl transition-all"
        }}
            selectedKeys={store && typeof store === 'string' ? [store] : []}
            onChange={((e)=> {
                if(e.target.value === "0" || e.target.value === "") {
                    router.push('/dashboard')
                } else {
                    router.push(`/dashboard?store=${e.target.value}`);
                }
            })}
        >
            {locations.map((location: Location) => (
                <SelectItem key={location.locationId.toString()} value={location.locationId.toString()}>
                    {location.locationName}
                </SelectItem>
            ))}
        </Select>
    )
}