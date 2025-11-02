'use client';
import {Product} from "@/entities";
import updateProduct from "@/actions/products/update";
import {Input, Button} from "@nextui-org/react";
import { LuDollarSign } from "react-icons/lu";
import SelectProvider from "../../_components/SelectProvider";
import { Provider } from "@/entities";

export default function UpdateProduct ({product, providers } : {product : Product, providers : Provider[]}) {
    return (
        <form action = {updateProduct}>
            <input type="hidden" name="productId" value={product.productId} />
            <Input name= "productName" label = "Nombre" defaultValue={product.productName}/>
            <Input name="countSeal" label = "No. Sellos" defaultValue={product.countSeal?.toString()}/>
            <Input name="price" endContent={<LuDollarSign size="20" />} label = "Precio" defaultValue={product.price?.toString()}/>
            <SelectProvider providers={providers} defaultProvider={product.provider?.providerId || ""}/>
            <Button type="submit" color="primary">Actualizar Producto</Button>
        </form>
    )
}