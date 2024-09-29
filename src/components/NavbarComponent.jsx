import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, Tooltip } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import ConfirmationModal from "./ConfirmationModal";

function NavbarComponent({
    addNote,
    ...props
}) {
    const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
    const [newNoteId, setNewNoteId] = useState(null);
    const navigate = useNavigate();

    const handleNewNote = () => {
        const newNote = addNote();
        setNewNoteId(newNote.id);
        setIsRedirectModalOpen(true);
    };

    return (
        <>
            <Navbar variant="fixed" className="h-10 pt-4">
                <NavbarContent>
                    <NavbarBrand>
                        <div className="flex items-center gap-x-1">
                            <ThemeSwitcher />
                            <Link href="/" className="hover:tracking-widest duration-200 transition-all">
                                <Button isIconOnly color="primary" variant="faded">
                                    <GetIcon name="Home" />
                                </Button>
                                <p className="ms-2 font-black text-inherit text-md metallic-text">NIGPAD</p>
                            </Link>
                        </div>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
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
            </Navbar>

            <ConfirmationModal
                isOpen={isRedirectModalOpen}
                onClose={() => setIsRedirectModalOpen(false)}
                title="New Note has been created."
                message="Would you like to Edit it now?"
                buttons={[
                    {
                        label: "No",
                        color: "danger",
                        onPress: () => {
                            setIsRedirectModalOpen(false);
                        },
                        variant: "light",
                    },
                    {
                        label: "Edit Now",
                        color: "primary",
                        onPress: () => {
                            navigate(`/note/${newNoteId}`);
                            setIsRedirectModalOpen(false);
                        },
                        variant: "shadow",
                    },
                ]}
            />
        </>
    );
}

export default NavbarComponent;
