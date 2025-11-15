'use client';
import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { ReactNode, cloneElement, isValidElement } from "react";
import { LuPlus} from "react-icons/lu";

export default function CreateEmployee({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const childrenWithProps = isValidElement(children)
        ? cloneElement(children as React.ReactElement<any>, { onClose })
        : children;

    return (
        <>
            <Button onPress={onOpen} color="primary"><LuPlus size="20" /></Button>
            <Modal className="bg-orange-400" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-0">
                                {childrenWithProps}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
