import { Provider } from "@/entities"
import { Input } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import updateProvider from "@/actions/providers/update"
import DeleteProvider from "./DeleteProvider";
import DeleteProviderButton from "./DeleteButton";

export default function FormUpdateProvider({ provider }: { provider: Provider }) {
    const {providerId} = provider;
    const updateProviderWithId = updateProvider.bind(null,providerId);

    return (
        <form className = "flex flex-wrap gap-4 flex-grow-0 bg-orange-200 rounded-md py-10 px-10 items-center justify-center" action = {updateProviderWithId}>
            <Input defaultValue={provider.providerName} label="Nombre" placeholder="Pepsi" name="providerName" />
            <Input defaultValue={provider.providerEmail} label="Correo" placeholder="business@pepsi.com" name="providerEmail" />
            <Input defaultValue={provider.providerPhoneNumber} label="Numero" placeholder="444XXXXX" name="providerPhoneNumber" />
            <Button color="primary" type="submit" >Actualizar Datos</Button>
            <DeleteProvider>
                <h1 className = "text-4xl text-center">¿Estás seguro que deseas eliminar al proveedor <b>{provider.providerName}</b>?</h1>
            <DeleteProviderButton providerId={providerId} />
            </DeleteProvider>
        </form>
    )
}