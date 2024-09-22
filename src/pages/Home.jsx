import NoteCard from "../components/NoteCard";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import Search from "../components/Search";
import { Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";

function Home({
    deleteNote,
    notes,
    tags,
    setCurrentNote,
    ...props
}) {
    useEffect(() => {
        setCurrentNote(null);
    }, [])
    const [filteredNotes, setFilteredNotes] = useState(notes);

    return (
        <div className="flex flex-col flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 px-6 pt-5">
                <Spacer className="hidden sm:block" />
                <Search notes={notes} setFilteredNotes={setFilteredNotes} filteredNotes={filteredNotes} />
                <Spacer className="hidden sm:block" />
            </div>
            <ScrollShadow hideScrollBar className="w-full flex-grow" size={40}>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                    {filteredNotes.map((note, index) => (
                        note && <NoteCard key={index} note={note} deleteNote={deleteNote} tags={tags} />
                    ))}

                </div>
            </ScrollShadow>
        </div>
    );
}

export default Home;
