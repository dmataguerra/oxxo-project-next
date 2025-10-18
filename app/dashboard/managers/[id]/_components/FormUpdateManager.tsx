'use client';
import updateManager from "@/actions/managers/update";
import { Manager, Location } from "@/entities";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import SelectStore from "./SelectStore";

interface FormUpdateManagerProps {
    manager: Manager;
    stores: Location[];
    onClose?: () => void;
}

export default function FormUpdateManager({ manager, stores, onClose }: FormUpdateManagerProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await updateManager(formData);
            if (result?.success) {
                if (onClose) onClose();
                router.refresh();
            }
        });
    }

    return (
        <form action={handleSubmit} className="bg-orange-400 p-6 flex flex-col gap-6 w-full">
            <h1 className="text-xl text-white text-center">Actualizar Manager</h1>
            <input type="hidden" name="managerId" value={manager.managerId} />
            <Input isRequired defaultValue={manager.managerFullName} label="Nombre completo" placeholder="Marco Aurelio" name="managerFullName" />
            <Input isRequired defaultValue={manager.managerEmail} label="Email" placeholder="marco@mail.com" name="managerEmail" />
            <Input isRequired defaultValue={manager.managerPhoneNumber} label="Teléfono" placeholder="+52 442 123 4567" name="managerPhoneNumber" />
            <Input isRequired defaultValue={manager.managerSalary.toString()} label="Salario" placeholder="5000" name="managerSalary" type="number" />
            <SelectStore stores={stores} defaultStore={manager?.location?.locationId || 0} />
            <Button type="submit" color="primary" isLoading={isPending}>
                {isPending ? 'Actualizando...' : 'Actualizar'}
            </Button>
        </form> 
    )
}