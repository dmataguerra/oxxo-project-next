'use client';
import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { ReactNode, cloneElement, isValidElement } from "react";
import { Image } from "@nextui-org/react";

export default function CreateEmployee({ children , icon, photo}: { children: ReactNode , icon: ReactNode, photo: string | undefined}) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const childrenWithProps = isValidElement(children)
        ? cloneElement(children as React.ReactElement<any>, { onClose })
        : children;

    return (
        <>
            <Image src={photo} onClick={onOpen} isZoomed className="object-cover" classNames={{img:"size-60",}}/>
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
