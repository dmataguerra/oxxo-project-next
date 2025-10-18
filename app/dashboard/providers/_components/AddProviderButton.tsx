'use client';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";
import FormNewProvider from "./FormNewProvider";
import { Product } from "@/entities";

export default function AddProviderButton({ products }: { products: Product[] }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} className="w-fit px-6" color="primary" size="lg">
                <LuPlus size="24" />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent>
                    <ModalHeader>Crear Proveedor</ModalHeader>
                    <ModalBody>
                        <FormNewProvider products={products} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
