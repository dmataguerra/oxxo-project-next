'use client';
import { Input } from "@nextui-org/react"
import createProvider from "@/actions/providers/create";
import { Button } from "@nextui-org/react";

export default function FormNewProvider() {
    return (
        <form action={createProvider} className="bg-orange-400 py-2 flex flex-col gap-6 w-full rounded-lg p-4">
            <h1 className="text-xl text-white text-center">Crear Proveedor</h1>
            <Input required={true} label="Nombre del proveedor" placeholder="Juan Perez" name="providerName" />
            <Input required={true} label="Email" placeholder="emailsito@gmail.com" name="providerEmail" />
            <Input required={true} label="Teléfono" placeholder="442 123 4567" name="providerPhoneNumber" />
            <Button type="submit" color="primary"> Subir </Button>
        </form>
    );
}