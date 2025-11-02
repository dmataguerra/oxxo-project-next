import createProduct from "@/actions/products/create";
import { authHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";
import ProductForm from "./_components/ProductForm";

const ProductsPage = async () => {
    const responseProviders = await fetch(`${API_URL}/providers`, {
        headers: {
            ...authHeaders(),
        },
    })
    const providers = await responseProviders.json();

    return <ProductForm providers={providers} />;
}

export default ProductsPage;
