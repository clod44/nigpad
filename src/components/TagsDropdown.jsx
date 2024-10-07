import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { FunnelIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function TagsDropdown({
    _selectedTags = [],
    handleSelectedTagsChange = () => { },
    ...props
}) {
    const { tags } = useContext(NoteContext);

    const [selectedTags, setSelectedTags] = useState(_selectedTags);

    useEffect(() => {
        handleSelectedTagsChange(selectedTags);
    }, [selectedTags]);

    return (
        <Dropdown>
            <DropdownTrigger>

                <Button
                    isIconOnly
                    variant="light"
                >
                    <FunnelIcon className={`size-6 text-default-400 ${selectedTags.length > 0 ? 'text-foreground' : ''} pointer-events-none flex-shrink-0`} />
                </Button>

            </DropdownTrigger>
            <DropdownMenu
                aria-label="Multiple selection example"
                variant="solid"
                color="primary"
                disallowEmptySelection={false}
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={selectedTags || []}
                onSelectionChange={(e) => {
                    setSelectedTags(Array.from(e));
                }}
            >
                <DropdownItem
                    key={"EditTags"}
                    value={"EditTags"}
                    textValue="Edit tags"
                    variant="faded"
                    startContent={<PencilSquareIcon className="size-6" />}
                    showDivider
                    href="/tags"
                >
                    <p className="font-bold">Edit Tags</p>
                </DropdownItem>
                {tags?.map((tag) => (
                    <DropdownItem
                        key={tag.id}
                        value={tag.id}
                        startContent={
                            <Chip size="sm" variant='bordered' color={tag?.color || 'default'}> </Chip>
                        }
                    >
                        {tag.title}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}