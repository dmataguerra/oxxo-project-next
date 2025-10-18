import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Provider, Product } from "@/entities";
import ProviderCard from "./_components/ProviderCard";
import Link from "next/link";
import AddProviderButton from "./_components/AddProviderButton";

const ProviderPage = async () => {
    const response = await fetch(`${API_URL}/providers`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            revalidate: 60,
            tags: ["dashboard:providers"]
        }
    });
    const providers: Provider[] = await response.json();
    
    const responseProducts = await fetch(`${API_URL}/products`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            revalidate: 60,
            tags: ["dashboard:products"]
        }
    });
    const products: Product[] = await responseProducts.json();
    
    return (
        <div className="flex flex-col h-[90vh] items-end px-10 pt-10 w-full gap-6">
            <AddProviderButton products={products} />
            <div className="grid grid-cols-2 gap-6 w-full">
                {providers.map((provider: Provider) => (
                    <Link key={provider.providerId} href={`/dashboard/providers/${provider.providerId}`} className="hover:scale-105 transition-transform">
                        <ProviderCard provider={provider} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProviderPage;