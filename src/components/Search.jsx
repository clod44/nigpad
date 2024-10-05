import { Input, Spinner } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchContext } from "../context/SearchContext";
import { useContext } from "react";
import TagsDropdown from "./TagsDropdown";

export default function Search({
    ...props
}) {
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
                        <TagsDropdown selectedTags={selectedTags} handleSelectedTagsChange={handleSelectedTagsChange} />
                        <div className="w-5 flex items-center justify-center">
                            {isLoading ? (
                                <Spinner size="sm" className="text-2xl text-default-400 flex-shrink-0" />
                            ) : (
                                <MagnifyingGlassIcon className="siz-6 text-default-400 pointer-events-none flex-shrink-0 p-0" />
                            )}
                        </div>
                    </div>
                }
            />
        </div>
    );
}
