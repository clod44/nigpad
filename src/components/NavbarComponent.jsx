import { Navbar, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, Tooltip, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Avatar } from "@nextui-org/react";
import { HomeIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import useDarkMode from '../hooks/useDarkMode';
import useAuth from "../hooks/useAuth";
import Search from "./Search";
import NavbarNoteOptions from "./NavbarNoteOptions";

function NavbarComponent({
    handleCreateNote,
    ...props
}) {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const { user, userLoading } = useAuth();

    const navigate = useNavigate();

    const isHomePage = window.location.pathname === "/";
    const isEditPage = window.location.pathname.includes("/note/");


    return (
        <>
            <Navbar
                isBordered
                className="shadow gap-0"
                maxWidth="full"
            >
                <NavbarContent className="gap-2" justify="start">
                    <NavbarBrand>
                        <Link to="/" className=" tracking-wide flex flex-nowrap items-center text-primary">
                            <Button isIconOnly variant="faded">
                                <HomeIcon className="size-6 text-primary" />
                            </Button>
                            <p className="ms-2 text-primary text-lg max-w-0 sm:max-w-full overflow-hidden transition-all duration-300">
                                NIGPAD
                            </p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent justify="center" >
                    {isHomePage && (
                        <NavbarItem>
                            <Search />
                        </NavbarItem>
                    )}
                    {isEditPage && (
                        <NavbarItem className="w-full">
                            <NavbarNoteOptions />
                        </NavbarItem>
                    )}


                </NavbarContent>
                <NavbarContent justify="end">
                    <Dropdown placement="bottom-end" className="border border-foreground-300">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform w-6 h-6 text-tiny"
                                color={user ? "primary" : "default"}
                                showFallback
                                src={user?.photoURL}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2" showDivider textValue="Profile" onClick={() => navigate("/profile")}>
                                <p className="font-semibold">
                                    {user?.isAnonymous && "Anonymous"}
                                    {!user?.isAnonymous && (user?.displayName || "Profile")}
                                </p>
                                <p className="text-foreground-400">
                                    {user?.isAnonymous && "No Email"}
                                    {!user?.isAnonymous && (user?.email || "Not logged in")}
                                </p>
                            </DropdownItem>
                            <DropdownItem key="tags" onClick={() => navigate("/tags")}>
                                My Tags
                            </DropdownItem>
                            <DropdownItem
                                key="toggle-dark-mode"
                                onClick={toggleDarkMode}
                                closeOnSelect={false}
                                endContent={isDarkMode ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}>
                                Theme
                            </DropdownItem>

                            <DropdownItem key="about" onClick={() => setIsAboutModalOpen(true)}>About</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent >
            </Navbar >

            <ConfirmationModal
                isOpen={isAboutModalOpen}
                onClose={() => setIsAboutModalOpen(false)}
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
