'use client';
import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { ReactNode, cloneElement, isValidElement } from "react";
import { LuPencil} from "react-icons/lu";

export default function UpdateLocation({ children , store }: { children: ReactNode, store : string | string[] | undefined }) {
    if(!store) return <div/>
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const childrenWithProps = isValidElement(children)
        ? cloneElement(children as React.ReactElement<any>, { onClose })
        : children;

    return (
        <>
            <Button onPress={onOpen} color="primary"><LuPencil size="20" /></Button>
            <Modal className="gb-orange-400"  isOpen={isOpen} onOpenChange={onOpenChange}>
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

