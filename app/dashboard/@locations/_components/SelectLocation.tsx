"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { Location } from "../../../../entities";
import { useRouter } from "next/navigation";

export default function SelectLocation({ locations }: { locations: Location[] }) {
    const router = useRouter();
    return (
        <Select placeholder="Selecciona una ubicación" classNames={{
            
            mainWrapper: "hover:ring-2 ring-red-200 rounded xl transition-all"
        }}
            onChange={((e)=> {
                router.push(`/dashboard?store=${e.target.value}`);
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