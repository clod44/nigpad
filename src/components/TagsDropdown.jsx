import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import GetIcon from "../icons/GetIcon";

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
                    <GetIcon name="Filter" className={`text-2xl text-default-400 ${selectedTags.length > 0 ? 'text-foreground' : ''} pointer-events-none flex-shrink-0`} />
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
                    startContent={<GetIcon name="Edit" />}
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
                            <Chip size="sm" style={{ backgroundColor: tag?.color || '#333333' }} variant='bordered'> </Chip>
                        }
                    >
                        {tag.title}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}