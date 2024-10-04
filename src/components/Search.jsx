import { Input, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useState, useEffect, useCallback } from "react";
import Fuse from "fuse.js";
import { debounce } from 'lodash';

export default function Search({
    notes = [],
    tags = [],
    setFilteredNotes,
    filteredNotes = [],
    ...props
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const debouncedFilterNotes = useCallback(
        debounce(async (term) => {
            setIsLoading(true);
            let tagsFilteredNotes = notes;

            if (selectedTags?.length > 0) {
                tagsFilteredNotes = notes?.filter(note =>
                    selectedTags.every(tag => note.tags.includes(tag))
                );
            }

            if (!term) {
                setFilteredNotes(tagsFilteredNotes);
                setIsLoading(false);
                return;
            }

            const fuse = new Fuse(tagsFilteredNotes, {
                keys: ['title', 'content'],
                threshold: 0.3,
                ignoreLocation: true,
                includeScore: true
            });

            const results = fuse.search(term);
            const filtered = results.map(result => result.item);

            setFilteredNotes(filtered);
            setIsLoading(false);
        }, 300),
        [notes, selectedTags, setFilteredNotes]
    );

    useEffect(() => {
        debouncedFilterNotes(searchTerm);
    }, [selectedTags, searchTerm, debouncedFilterNotes]);

    useEffect(() => {
        return () => {
            debouncedFilterNotes.cancel();
        };
    }, [debouncedFilterNotes]);

    const handleSearchTermUpdate = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsLoading(true);
        debouncedFilterNotes(value);
    };

    const handleSelectedTagsChange = (e) => {
        const newTagsArray = Array.from(e);
        setSelectedTags(newTagsArray);
        setIsLoading(true);
    };

    return (
        <div>
            <Input
                type="text"
                label={searchTerm ? `${filteredNotes.length} found` : `${notes.length} notes`}
                placeholder="Search"
                labelPlacement="inside"
                value={searchTerm || ''}
                onChange={handleSearchTermUpdate}
                endContent={
                    <div className="flex gap-2 flex-nowrap items-center">
                        {isLoading ? (
                            <Spinner size="sm" className="text-2xl text-default-400 flex-shrink-0" />
                        ) : (
                            <>
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
                                <GetIcon name="Search" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            </>
                        )}
                    </div>
                }
            />
        </div>
    );
}
