import { authHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";
import { Product } from "@/entities";
import FilteredCards from "./_components/FilteredCards";

const ProductsPage = async () => {
    const response  = fetch(`${API_URL}/products`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            tags: ["dashboard:products"]
        }
    });
    const products : Product[] = await (await response).json();
    return (
        <div>
            <FilteredCards products={products} />
        </div>
    )
}

export default ProductsPage;