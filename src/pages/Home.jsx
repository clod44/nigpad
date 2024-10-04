import { useState, useEffect, useContext } from "react";
import { Spacer, ScrollShadow } from "@nextui-org/react";
import NoteCard from "../components/NoteCard";
import Search from "../components/Search";
import Fab from "../components/Fab";
import { NoteContext } from "../context/NoteProvider";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();
    const { notes, tags, handleDeleteNote, handleCreateNote } = useContext(NoteContext);
    const [filteredNotes, setFilteredNotes] = useState(notes);

    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes]);


    return (
        <>
            <Fab
                buttons={[
                    {
                        tooltip: "New Note",
                        onClick: async () => {
                            const noteId = await handleCreateNote();
                            if (!noteId) return;
                            navigate(`/note/${noteId}`);
                        },
                        className: "text-primary",
                        iconName: "NewFile"
                    }
                ]}
            />
            <div className="flex flex-col flex-grow overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 px-4 pt-4">
                    <Spacer className="hidden sm:block" />
                    <Search notes={notes} setFilteredNotes={setFilteredNotes} filteredNotes={filteredNotes} tags={tags} />
                    <Spacer className="hidden sm:block" />
                </div>
                <ScrollShadow hideScrollBar className="w-full flex-grow" size={40}>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                        {filteredNotes?.map((note) => {
                            return note && (
                                <NoteCard key={note.id} note={note} handleDeleteNote={handleDeleteNote} tags={tags} />
                            );
                        })}
                        <Spacer size="lg" />
                    </div>
                </ScrollShadow>
            </div>
        </>
    );
}
