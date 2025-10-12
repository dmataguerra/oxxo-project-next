'use client';
import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { ReactNode, cloneElement, isValidElement } from "react";
import { LuPenTool } from "react-icons/lu";

export default function UpdateLocation({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const childrenWithProps = isValidElement(children)
        ? cloneElement(children as React.ReactElement<any>, { onClose })
        : children;

    return (
        <>
            <Button onPress={onOpen} color="primary"><LuPenTool size="20" /></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                {childrenWithProps}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

