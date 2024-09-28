import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, button } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function NavbarComponent({
    addNote,
    ...props }
) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newNoteId, setNewNoteId] = useState(null);

    const handleOpenModal = () => {
        onOpen();
    }

    const handleNewNote = () => {
        const newNote = addNote();
        setNewNoteId(newNote.id);
        handleOpenModal()
    };
    return (
        <>
            <Navbar variant="fixed" className="h-10 pt-4">
                <NavbarContent>
                    <NavbarBrand>
                        <div className="flex items-center gap-x-1">
                            <ThemeSwitcher />
                            <Link href="/">
                                <Button isIconOnly color="primary" variant="faded">
                                    <GetIcon name="Home" />
                                </Button>
                                <p className="ms-2 font-black text-inherit text-md metallic-text">NIGPAD</p>
                            </Link>
                        </div>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem >
                        <Tooltip
                            className="text-xs"
                            showArrow={true}
                            content="New Note"
                            placement="Bottom"
                        >
                            <Button isIconOnly color="primary" variant="faded" onClick={handleNewNote}>
                                <GetIcon name="NewFile" />
                            </Button>
                        </Tooltip>
                    </NavbarItem>
                </NavbarContent>
            </Navbar >


            <Modal
                size={"xs"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">New Note has been created.</ModalHeader>
                            <ModalBody>
                                <p>Would you like to Edit it now?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    No
                                </Button>
                                <Link href={`/note/${newNoteId}`}>
                                    <Button color="primary" variant="shadow" onPress={onClose}>
                                        Edit Now
                                    </Button>
                                </Link>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default NavbarComponent;

