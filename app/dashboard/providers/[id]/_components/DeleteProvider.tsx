'use client';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { LuTrash } from "react-icons/lu";

export default function DeleteProvider({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} className="w-fit px-6" color="danger" size="lg">
                <LuTrash size="24" />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent className="w-full bg-orange-200">
                    {(onClose) => (
                        <>
                            <ModalHeader>Eliminar Proveedor</ModalHeader>
                            <ModalBody>
                                {children}
                                <Button onPress={onClose}>Cancelar</Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}