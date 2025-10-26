import { Provider } from '@/entities';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

export default function ProviderCard({ provider }: { provider: Provider }) {
    return (
        <Card className="w-full max-w-sm shadow-lg hover:scale-105 transition-transform">
            <CardHeader className="px-4 py-3">
                <div className="text-sm font-semibold">{provider.providerName}</div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-2 px-4 py-3 text-sm">
                <p className="text-xs">Correo electrónico:</p>
                <div className="font-bold text-sm">{provider.providerEmail}</div>
                <p className="mt-2 text-xs">Numero de teléfono:</p>
                <div className="font-bold text-sm">{provider.providerPhoneNumber}</div>
                <div className="mt-2 text-sm">
                    {provider.products && provider.products.length > 0 ? (
                        <span>Tiene <b>{provider.products.length}</b> productos</span>
                    ) : (
                        <span>No tiene productos</span>
                    )}
                </div>
            </CardBody>
        </Card>
    )
}