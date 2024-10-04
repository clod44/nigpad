import { Navbar, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, Tooltip, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Avatar } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import useDarkMode from '../hooks/useDarkMode';
import useAuth from "../hooks/useAuth";
import Search from "./Search";

function NavbarComponent({
    handleCreateNote,
    ...props
}) {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const { isDarkMode, toggleDarkMode, currentThemeIconName } = useDarkMode();

    const { user, userLoading } = useAuth();

    const navigate = useNavigate();




    return (
        <>
            <Navbar
                isBordered
                variant="fixed"
                className="shadow"
            >

                <NavbarContent className="gap-4" justify="center">
                    <NavbarBrand>
                        <Link to="/" className=" tracking-wide hover:tracking-widest duration-200 transition-all flex flex-nowrap items-center text-primary">
                            <GetIcon name="Home" className="hidden sm:flex" />
                            <p className="ms-2 font-bold text-inherit text-lg metallic-text">NIGPAD</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent as="div" justify="end">
                    <NavbarItem>
                        <Search />
                    </NavbarItem>
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
                                endContent={<GetIcon name={currentThemeIconName} />}>
                                Theme
                            </DropdownItem>
                            <DropdownItem key="about" onClick={() => setIsAboutModalOpen(true)}>About</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
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
