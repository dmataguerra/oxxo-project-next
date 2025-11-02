'use client';
import { Product } from "@/entities"
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { Provider } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

export default function FilteredCards({ products, providers }: { products: Product[], providers: Provider[] }) {
    let [filtered, setFiltered] = useState<string>("");
    const [provider, setProvider] = useState<string>("");
    const [productsList, setProductsList] = useState<Product[]>(products);
    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            if (product.productName.toLowerCase().includes(filtered.toLowerCase()) && (!provider || provider === "" ? true : product.provider?.providerId === provider)) {
                return true;
            } else {
                return false;
            }
        })
        setProductsList(filteredProducts);
    }, [filtered,provider])

    return (
        <>
            <div className="max-h-[90vh] min-h-[90vh] overflow-y-auto flex flex-col gap-8 border-r-orange-400 border-r-2 pt-10 px-10" >
                <Select label="Proveedor" value={provider} onChange={(e) => setProvider(e.target.value)}>
                    <SelectItem key="" value="">
                        Ninguna
                    </SelectItem>
                    {providers.map((p) => (
                        <SelectItem key={p.providerId} value={p.providerId}>
                            {p.providerName}
                        </SelectItem>
                    ))}
                </Select>
                <Input onChange={(e) => {
                    setFiltered(e.target.value);
                }}
                    label="Nombre del producto"
                />
                {productsList.map((product) => {
                    return (
                        <Link className="hover:scale-110 transition-transform" key={product.productId} href={`/dashboard/products/${product.productId}`}>
                            <ProductCard product={product} />
                        </Link>
                    );
                })}
            </div>
        </>
    )
}