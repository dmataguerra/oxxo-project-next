import { Product , Provider} from "@/entities";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import ProductCard from "../_components/ProductCard";
import UpdateProduct from "./_components/UpdateProduct";

export default async function ProductPage({params} : {params : {id : string}}) {
    const responseProduct = await fetch(`${API_URL}/products/${params.id}`, {
        headers: {
            ...authHeaders(),
        },
        next : {
            tags : [`dashboard:products:${params.id}`]
        }
    });
    const product: Product = await responseProduct.json();
    const responseProviders = await fetch(`${API_URL}/providers`, {
        headers: {
            ...authHeaders(),
        }
    });
    const providers: Provider [] = await responseProviders.json();
    return (
        <>
        <ProductCard product={product}/>
        <UpdateProduct product={product} providers={providers} />
        </>
    )
}