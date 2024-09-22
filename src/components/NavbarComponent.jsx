import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, Tooltip } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function NavbarComponent({
    addNote,
    currentNote,
    ...props }
) {
    const navigate = useNavigate();
    const [isCurrentNoteNew, setIsCurrentNoteNew] = useState(false);
    useEffect(() => {
        if (currentNote) {
            setIsCurrentNoteNew(currentNote.lastUpdated - currentNote.timestamp < 1000);
        } else {
            setIsCurrentNoteNew(false);
        }
    }, []);
    useEffect(() => {
        if (currentNote) {
            setIsCurrentNoteNew(currentNote.lastUpdated - currentNote.timestamp < 1000);
        } else {
            setIsCurrentNoteNew(false);
        }
    }, [currentNote]);

    const handleNewNote = () => {
        const newNote = addNote();
        navigate(`/note/${newNote.id}`);
    };
    return (
        <Navbar variant="fixed" className="h-10 pt-4">
            <NavbarContent>
                <NavbarBrand>
                    <Link href="/">
                        <Button isIconOnly color="primary" variant="faded">
                            <GetIcon name="Home" />
                        </Button>
                        <p className="ms-2 font-black text-inherit text-md metallic-text">NIGPAD</p>
                    </Link>
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
                        {
                            !isCurrentNoteNew && (
                                <Button isIconOnly color="primary" variant="faded" onClick={handleNewNote}>
                                    <GetIcon name="NewFile" />
                                </Button>
                            )
                        }
                    </Tooltip>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default NavbarComponent;