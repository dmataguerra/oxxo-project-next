'use client';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { LuTrash } from "react-icons/lu";
import deleteProduct from "@/actions/products/delete";


export default function DeleteProduct({productId} : {productId : string}) {
    const deleteProductById = deleteProduct.bind(null, productId)
    return (
        <form action = {deleteProductById}>
            <Button type="submit" color = "danger">
                <LuTrash size="20" />
            </Button>
        </form>
    )
}