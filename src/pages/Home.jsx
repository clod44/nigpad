import { useState, useEffect } from "react";
import { Spacer, ScrollShadow } from "@nextui-org/react";
import NoteCard from "../components/NoteCard";
import Search from "../components/Search";

export default function Home({
    handleDeleteNote,
    notes,
    tags,
    ...props
}) {
    const [filteredNotes, setFilteredNotes] = useState(notes);
    //console.log('Notes:', JSON.stringify(notes, null, 2)); // Pretty-print the notes array

    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes]);

    return (
        <div className="flex flex-col flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 px-4 pt-4">
                <Spacer className="hidden sm:block" />
                <Search notes={notes} setFilteredNotes={setFilteredNotes} filteredNotes={filteredNotes} tags={tags} />
                <Spacer className="hidden sm:block" />
            </div>
            <ScrollShadow hideScrollBar className="w-full flex-grow" size={40}>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                    {filteredNotes.map((note) => {
                        console.log('Note:', note); // Log each note
                        return note && (
                            <NoteCard key={note.id} note={note} handleDeleteNote={handleDeleteNote} tags={tags} />
                        );
                    })}
                    <Spacer size="lg" />
                </div>
            </ScrollShadow>

        </div>
    );
}
