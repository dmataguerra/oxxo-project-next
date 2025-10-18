'use client';
import updateManager from "@/actions/managers/update";
import { Manager } from "@/entities";
import { Input, Button } from "@nextui-org/react";
import { authHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";
import SelectStore from "./SelectStore";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface FormUpdateManagerProps {
    manager: Manager;
    onClose?: () => void;
}

export default function FormUpdateManager({ manager, onClose }: FormUpdateManagerProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            await updateManager(formData);
            if (onClose) onClose();
            router.refresh();
        });
    }

    return (
        <form action={handleSubmit} className="bg-orange-400 p-6 flex flex-col gap-6 w-full">
            <h1 className="text-xl text-white text-center">Actualizar Manager</h1>
            <input type="hidden" name="managerId" value={manager.managerId} />
            <Input required={true} defaultValue={manager.managerFullName} label="Nombre completo" placeholder="Marco Aurelio" name="managerFullName" />
            <Input required={true} defaultValue={manager.managerEmail} label="Email" placeholder="marco@mail.com" name="managerEmail" />
            <Input required={true} defaultValue={manager.managerPhoneNumber} label="Teléfono" placeholder="+52 442 123 4567" name="managerPhoneNumber" />
            <Input required={true} defaultValue={manager.managerSalary.toString()} label="Salario" placeholder="5000" name="managerSalary" type="number" />
            <Button type="submit" color="primary" isLoading={isPending}>
                {isPending ? 'Actualizando...' : 'Actualizar'}
            </Button>
        </form> 
    )
}