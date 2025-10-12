'use client';
import { Input, Button } from "@nextui-org/react";
import SelectManager from "./SelectManager";
import { Location, Manager } from "@/entities";
import { updateLocation } from "@/actions/locations/update";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface FormUpdateLocationProps {
    store: string | string[] | undefined;
    managers: Manager[];
    locations: Location[];
    onClose?: () => void;
}

export default function FormUpdateLocation({ store, managers, locations, onClose }: FormUpdateLocationProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    if (!store || store === undefined || typeof store === "object") return null;

    const foundLocation = locations.find((location) => location.locationId === +store);
    const foundManager = managers.find((manager) => manager.managerId === foundLocation?.manager?.managerId);

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await updateLocation(store as string, formData);
            if (result?.success && result.locationId) {
                if (onClose) onClose();
                router.push(`/dashboard?store=${result.locationId}`);
                router.refresh();
            }
        });
    }

    return (
        <form action={handleSubmit} className="bg-orange-400 p-6 flex flex-col gap-6 w-full">
            <h1 className="text-xl text-white text-center">Actualizar Tienda</h1>
            <Input required={true} defaultValue={foundLocation?.locationName} label="Nombre de la tienda" placeholder="Oxxo-Juriquilla" name="locationName" />
            <Input required={true} defaultValue={foundLocation?.locationAddress} label="Direccion" placeholder="Avenida de la Luz" name="locationAddress" />
            <Input required={true} defaultValue={foundLocation?.locationLating[0].toString()} label="Latitud" placeholder="-120" name="locationLat" />
            <Input required={true} defaultValue={foundLocation?.locationLating[1].toString()} label="Longitud" placeholder="200" name="locationLng" />
            <SelectManager defaultManager={foundManager?.managerId?.toString()} managers={managers} locations={locations} />
            <Button type="submit" color="primary" isLoading={isPending} >
                {isPending ? 'Actualizando...' : 'Actualizar'}
            </Button>
        </form>
    );
}
