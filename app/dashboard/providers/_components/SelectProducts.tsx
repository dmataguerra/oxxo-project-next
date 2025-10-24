'use client'
import {Product} from '@/entities'
import {Select, SelectItem} from '@nextui-org/react'

export default function SelectProducts({products} : {products: Product[]}){
    const disabledProducts = products
        .filter((product: Product) => product.provider && product.provider.providerId)
        .map((product: Product) => product.productId);
    
    return (
        <Select 
            name="products" 
            label="Productos" 
            placeholder="Selecciona productos" 
            selectionMode="multiple" 
            disabledKeys={disabledProducts}
        >
            {products.map((product: Product) => (
                <SelectItem key={product.productId}>
                    {product.productName}
                </SelectItem>
            ))}
        </Select>
    )
}