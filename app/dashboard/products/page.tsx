import { authHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";
import { Product } from "@/entities";
import ProductCard from "./_components/ProductCard";

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
            {products.map((product) => {
                return (
                    <ProductCard key={product.productId} product={product} />
                )
            })}
        </div>
    )
}

export default ProductsPage;