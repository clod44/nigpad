import { Input, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { NoteContext } from "../context/NoteContext";
import { SearchContext } from "../context/SearchContext";
import { useContext } from "react";
export default function Search({
    ...props
}) {
    const { tags } = useContext(NoteContext);
    const {
        searchTerm,
        isLoading,
        selectedTags,
        handleSearchTermUpdate,
        handleSelectedTagsChange
    } = useContext(SearchContext);


    return (
        <div>
            <Input
                size="md"
                type="text"
                placeholder="Search"
                value={searchTerm || ''}
                onChange={handleSearchTermUpdate}
                variant="faded"
                color="primary"
                endContent={
                    <div className="flex gap-2 flex-nowrap items-center">
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
                                onSelectionChange={handleSelectedTagsChange}
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
                                    <DropdownItem key={tag.id} value={tag.id}>
                                        {tag.title}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <div className="w-5 flex items-center justify-center">
                            {isLoading ? (
                                <Spinner size="sm" className="text-2xl text-default-400 flex-shrink-0" />
                            ) : (
                                <GetIcon name="Search" className="text-2xl text-default-400 pointer-events-none flex-shrink-0 p-0" />
                            )}
                        </div>
                    </div>
                }
            />
        </div>
    );
}
