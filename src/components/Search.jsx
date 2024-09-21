import { Input, Spinner } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";

export default function Search({
    notes,
    setFilteredNotes,
    filteredNotes,
    ...props
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(null);


    useEffect(() => {
        filterNotes(searchTerm);
    }, [notes]);

    const fuse = new Fuse(notes, {
        keys: ['title', 'content'],
        threshold: 0.3,
        ignoreLocation: true,
        includeScore: true
    });

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
        if (!term) {
            setFilteredNotes(notes);
            setIsLoading(false);
        } else {
            const results = fuse.search(term);
            const filtered = results.map(result => result.item);
            setFilteredNotes(filtered);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return (
        <Input
            type="text"
            label={searchTerm ? `${filteredNotes.length} found` : `${notes.length} notes`}
            placeholder="Search"
            labelPlacement="inside"
            value={searchTerm}
            onChange={handleSearchTermUpdate}
            endContent={
                <>
                    {isLoading ? (
                        <Spinner size="sm" className="text-2xl text-default-400 flex-shrink-0" />
                    ) : (
                        <GetIcon name="Search" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    )}
                </>
            }
        />
    );
}
