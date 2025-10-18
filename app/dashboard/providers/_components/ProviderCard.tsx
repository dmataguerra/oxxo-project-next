import { Provider } from '@/entities';
import { Card, CardBody, CardHeader , Divider} from '@nextui-org/react';

export default function ProviderCard({ provider }: { provider: Provider }) {
    return (
        <Card className="w-full"> 
            <CardHeader>
                <b>{provider.providerName}</b>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-2">
                <p>Correo electrónico: <b>{provider.providerEmail}</b></p>
                <p>Número de teléfono: <b>{provider.providerPhoneNumber}</b></p>
                {provider.products ? (
                    <p>Tiene <b>{provider.products.length}</b> productos</p>
                ) : <p>No tiene productos</p>
                }
            </CardBody>
        </Card>
    )
}