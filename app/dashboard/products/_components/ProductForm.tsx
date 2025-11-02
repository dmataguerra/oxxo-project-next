'use client';
import createProduct from "@/actions/products/create";
import { Input, Button } from "@nextui-org/react";
import { LuDollarSign } from "react-icons/lu";
import SelectProvider from "./SelectProvider";
import { Provider } from "@/entities";

export default function ProductForm({ providers }: { providers: Provider[] }) {
    return (
        <form className="flex flex-col px-40 justify-center pt-10 gap-6 bg-orange-600" action={createProduct}>
            <h1 className="text-2xl  font-bold">Crear Producto</h1>
            <Input label="Nombre" name="productName" />
            <Input label="Precio" endContent={<LuDollarSign size="20" />} name="price" />
            <Input label="No. Sellos" name="countSeal" />
            <SelectProvider providers={providers} defaultProvider="" />
            <Button type="submit" color="primary" className="w-fit mx-auto">
                Crear Producto
            </Button>
        </form>
    );
}