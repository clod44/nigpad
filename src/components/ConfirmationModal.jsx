import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

function ConfirmationModal({
    isOpen,
    onClose,
    title,
    message,
    buttons = [
        {
            label: "Okay",
            color: "primary",
            onPress: onClose,
            variant: "light",
        },
    ],
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        <p>{message}</p>
                    </ModalBody>
                    <ModalFooter>
                        {buttons.map((button, index) => (
                            <Button
                                key={index}
                                color={button.color}
                                variant={button.variant}
                                onPress={button.onPress}
                            >
                                {button.label}
                            </Button>
                        ))}
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}

export default ConfirmationModal;
