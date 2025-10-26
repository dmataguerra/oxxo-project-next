'use client';
import { Product } from "@/entities"
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";

export default function FilteredCards({ products }: { products: Product[] }) {
    let [filtered, setFiltered] = useState<string>("");
    const [productsList, setProductsList] = useState<Product[]>(products);
    useEffect(() => {
       const filteredProducts = products.filter((product) => {
        if (product.productName.toLowerCase().includes(filtered.toLowerCase())) {
            return true;
        } else {
            return false;
        }
       })
       setProductsList(filteredProducts);
    },[filtered])

    return (
        <>
        <div className = "max-h-[90vh] min-h-[90vh] overflow-y-auto flex flex-col gap-8 border-r-orange-400 border-r-2 pt-10 px-10" >
            <Input onChange={(e) => {
                setFiltered(e.target.value);
            }} 
            label = "Nombre del producto"
            />
            {productsList.map((product) => {
                return (
                    <Link  className = "hover:sacle-110 transition-transform " key={product.productId} href={`/dashboard/products/${product.productId}`}>
                    <ProductCard product={product} />
                    </Link>
                );
            })}
            </div>
        </>
    )
}