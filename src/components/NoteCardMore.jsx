import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";

import { useNavigate } from 'react-router-dom';

function NoteCardMore({
    deleteNote,
    id, //ntoe id
    ...props
}) {
    const navigate = useNavigate();
    const handleClickEdit = () => {
        navigate(`/note/${id}`);
    };
    const handleClickDelete = () => {
        deleteNote(id)
        navigate(`/`);
    }

    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    return (
        <Dropdown className="text-foreground shadow border border-default-100">
            <DropdownTrigger>
                <Button isIconOnly variant="light">
                    <GetIcon name="More" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded">
                <DropdownItem
                    key="edit"
                    shortcut="⌘⇧E"
                    startContent={<GetIcon name="Edit" className={iconClasses} />}
                    onClick={handleClickEdit}
                >
                    Edit file
                </DropdownItem>
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    shortcut="⌘⇧D"
                    startContent={<GetIcon name="Delete" className={cn(iconClasses, "text-danger")} />}
                    onClick={handleClickDelete}
                >
                    Delete file
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default NoteCardMore