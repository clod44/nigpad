import { useState, useEffect, useCallback, useContext, createContext } from 'react';
import Fuse from "fuse.js";
import { debounce } from 'lodash';
import { NoteContext } from '../context/NoteContext';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);

    const { notes } = useContext(NoteContext);

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

    const handleSelectedTagsChange = (newTagsArray) => {
        setSelectedTags(newTagsArray);
        setIsLoading(true);
    };

    return (
        <SearchContext.Provider value={{
            searchTerm,
            isLoading,
            selectedTags,
            filteredNotes,
            setFilteredNotes,
            handleSearchTermUpdate,
            handleSelectedTagsChange
        }}>
            {children}
        </SearchContext.Provider>
    );
}