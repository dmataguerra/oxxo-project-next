'use client';
import { Button, Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";
import { LuPlus } from 'react-icons/lu';
import FormCreateUserManager from './FormCreateUserManager';
import { Manager } from '@/entities';

export default function CreateUserManager({ manager } : { manager: Manager }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} className="ml-2" auto color="primary" size="sm">
                <LuPlus />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalContent>
                    <ModalBody>
                        <FormCreateUserManager manager={manager} onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
