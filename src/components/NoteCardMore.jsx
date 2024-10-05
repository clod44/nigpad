import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { useNavigate } from 'react-router-dom';

function NoteCardMore({
    handleDeleteNote,
    id, //ntoe id
    ...props
}) {
    const navigate = useNavigate();
    const handleClickEdit = () => {
        navigate(`/note/${id}`);
    };
    const handleClickDelete = () => {
        handleDeleteNote(id)
        navigate(`/`);
    }

    return (
        <Dropdown className="text-foreground shadow border border-default-100">
            <DropdownTrigger>
                <Button isIconOnly variant="light">
                    <EllipsisVerticalIcon className="size-6 text-default-500 flex-shrink-0" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded">
                <DropdownItem
                    key="edit"
                    startContent={<PencilSquareIcon className="size-6" />}
                    onClick={handleClickEdit}
                >
                    Edit file
                </DropdownItem>
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<TrashIcon className="size-6 text-danger" />}
                    onClick={handleClickDelete}
                >
                    Delete file
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default NoteCardMore