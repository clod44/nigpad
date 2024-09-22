import { Input, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";

export default function Search({
    notes,
    tags,
    setFilteredNotes,
    filteredNotes,
    ...props
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);





    const handleSearchTermUpdate = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsLoading(true);

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            filterNotes(value);
        }, 300);

        setTimer(newTimer);
    };
    const filterNotes = async (term) => {
        setIsLoading(true);

        let tagsFilteredNotes = notes;

        if (selectedTags.length > 0) {
            tagsFilteredNotes = notes.filter(note =>
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
    };


    const handleSelectedTagsChange = (e) => {
        const newTagsArray = Array.from(e);
        console.log(newTagsArray);
        setSelectedTags(newTagsArray);
    };


    useEffect(() => {
        filterNotes(searchTerm);
    }, [notes, selectedTags]);

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return (
        <div>
            <Input
                type="text"
                label={searchTerm ? `${filteredNotes.length} found` : `${notes.length} notes`}
                placeholder="Search"
                labelPlacement="inside"
                value={searchTerm}
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
                                        variant="flat"
                                        disallowEmptySelection={false}
                                        closeOnSelect={false}
                                        selectionMode="multiple"
                                        selectedKeys={selectedTags}
                                        onSelectionChange={(e) => handleSelectedTagsChange(e)}
                                    >
                                        {tags.map((tag) => (
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

        </div >
    );
}
