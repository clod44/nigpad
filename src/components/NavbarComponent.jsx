import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, Tooltip } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import ConfirmationModal from "./ConfirmationModal";

function NavbarComponent({
    addNote,
    ...props
}) {
    const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
    const [newNoteId, setNewNoteId] = useState(null);
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

    const navigate = useNavigate();

    const handleNewNote = () => {
        const newNote = addNote();
        setNewNoteId(newNote.id);
        setIsRedirectModalOpen(true);
    };


    const hamburgerMenuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <>
            <Navbar
                isBordered
                isMenuOpen={isHamburgerMenuOpen}
                onMenuOpenChange={setIsHamburgerMenuOpen}
                variant="fixed"
                className="h-10">
                {/*Hamburger menu Button */}
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isHamburgerMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>


                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <Link to="/" className="hover:tracking-widest duration-200 transition-all">
                            <p className="ms-2 font-black text-inherit text-md metallic-text">NIGPAD</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>


                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        <ThemeSwitcher />
                        <Link to="/" className="hover:tracking-widest duration-200 transition-all flex flex-nowrap items-center text-primary">
                            <GetIcon name="Home" />
                            <p className="ms-2 font-black text-inherit text-md metallic-text">NIGPAD</p>
                        </Link>
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
                            <Button isIconOnly color="primary" variant="light" onClick={handleNewNote}>
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
