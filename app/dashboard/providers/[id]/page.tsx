import { API_URL } from "@/constants"
import ProviderCard from "../_components/ProviderCard"
import { authHeaders } from "@/helpers/authHeaders"
import { Provider } from "@/entities"
import ProductCard from "./_components/ProductCard"
import { Product } from "@/entities"

type ProductWithoutProvider = Omit<Product, 'provider'>;

export default async function ProviderPage({ params }: { params: { id: string } }) {
    const provider: Provider = await (await fetch(`${API_URL}/providers/${params.id}`, {
        headers: {
            ...authHeaders(),
        },
    })
    ).json();

    return (
        <div className="flex flex-col px-10 gap-8 h-[90vh] pt-10">
            {/* Top area: compact provider summary on the left */}
            <div className="w-full flex">
                <div className="w-full lg:w-1/3">
                    <ProviderCard provider={provider} />
                </div>
            </div>

            {/* Horizontal divider to separate provider meta from products */}
            <div className="w-full">
                <hr className="border-t-2 my-4" style={{borderColor: '#5C2A1A'}} />
            </div>

            {/* Products grid: two columns, responsive */}
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {provider.products && provider.products.map((product: Product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}