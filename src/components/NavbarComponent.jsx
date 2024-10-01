import { Navbar, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, Tooltip, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Avatar } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import useDarkMode from '../hooks/useDarkMode';
import { getCurrentUser } from "../services/authService";

function NavbarComponent({
    addNote,
    ...props
}) {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
    const [newNoteId, setNewNoteId] = useState(null);
    const { isDarkMode, toggleDarkMode, currentThemeIconName } = useDarkMode();

    const navigate = useNavigate();

    const handleNewNote = () => {
        const newNote = addNote();
        setNewNoteId(newNote.id);
        setIsRedirectModalOpen(true);
    };


    return (
        <>
            <Navbar
                isBordered
                variant="fixed"
                height={"2.5rem"}>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <Link to="/" className="hover:tracking-widest duration-200 transition-all">
                            <p className="ms-2 font-black text-inherit text-md metallic-text">NIGPAD</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>


                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        <Link to="/" className="hover:tracking-widest duration-200 transition-all flex flex-nowrap items-center text-primary">
                            <GetIcon name="Home" />
                            <p className="ms-2 font-black text-inherit text-md metallic-text">NIGPAD</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent as="div" justify="end">

                    <NavbarItem>
                        <Link to="/profile" color="primary" variant="light">
                            Profile
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="/login" color="primary" variant="light">
                            Login
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Tooltip
                            className="text-xs"
                            showArrow={true}
                            content="New Note"
                            placement="Bottom"
                        >
                            <Button isIconOnly color="primary" variant="light" onClick={handleNewNote}>
                                <GetIcon name="NewFile" />
                            </Button>
                        </Tooltip>
                    </NavbarItem>
                    <Dropdown placement="bottom-end" className="border border-foreground-300">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform w-6 h-6 text-tiny"
                                color="primary"
                                showFallback
                                src="#"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2" showDivider textValue="Profile" onClick={() => navigate("/profile")}>
                                <p className="font-semibold">Profile</p>
                                <p className="text-foreground-400">{getCurrentUser().email}</p>
                            </DropdownItem>
                            <DropdownItem key="tags" onClick={() => navigate("/tags")}>
                                My Tags
                            </DropdownItem>
                            <DropdownItem
                                key="toggle-dark-mode"
                                onClick={toggleDarkMode}
                                closeOnSelect={false}
                                endContent={<GetIcon name={currentThemeIconName} />}>
                                Theme
                            </DropdownItem>
                            <DropdownItem key="about" onClick={() => setIsAboutModalOpen(true)}>About</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar >

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
            <ConfirmationModal
                isOpen={isAboutModalOpen}
                onClose={() => setIsRedirectModalOpen(false)}
                title="NIGPAD - beta"
                message="Made by clod44 - https://github.com/clod44/nigpad"
                buttons={[
                    {
                        label: "Ok",
                        color: "primary",
                        onPress: () => {
                            setIsAboutModalOpen(false);
                        },
                        variant: "light",
                    }
                ]}
            />
        </>
    );
}

export default NavbarComponent;
