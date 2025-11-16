'use client';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";
import FormCreateManager from "./FormCreateManager";

export default function AddManagerButton({ stores }: { stores?: any[] }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div className="flex justify-center mt-4">
                <Button onPress={onOpen} className="w-fit px-6" color="primary" size="lg">
                    <LuPlus size="24" />
                </Button>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent>
                    <ModalHeader>Crear Manager</ModalHeader>
                    <ModalBody>
                        <FormCreateManager onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
