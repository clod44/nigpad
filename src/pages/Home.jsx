import { useEffect, useContext } from "react";
import { Spacer, ScrollShadow } from "@nextui-org/react";
import NoteCard from "../components/NoteCard";
import NoteCardSkeleton from "../components/NoteCardSkeleton";
import Fab from "../components/Fab";
import { NoteContext } from "../context/NoteContext";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Home() {
    const navigate = useNavigate();
    const { notes, tags, handleDeleteNote, handleCreateNote, notesLoading } = useContext(NoteContext);
    const { filteredNotes, setFilteredNotes } = useContext(SearchContext);
    const { user } = useAuth();

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
                            try {
                                const noteId = await handleCreateNote();
                                console.log("Created Note ID:", noteId);

                                if (noteId) {
                                    navigate(`/note/${noteId}`);
                                } else {
                                    console.error("No note ID returned, unable to navigate.");
                                }
                            } catch (error) {
                                console.error("Error creating note:", error);
                            }
                        },
                        className: "text-primary"
                    }
                ]}
            />

            <div className="flex flex-col flex-grow overflow-y-auto">
                <ScrollShadow hideScrollBar className="w-full flex-grow" size={40}>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                        {/* Show skeleton loaders while notes are loading */}
                        {notesLoading && (
                            <>
                                <NoteCardSkeleton opacity={1.0} />
                                <NoteCardSkeleton opacity={0.75} />
                                <NoteCardSkeleton opacity={0.33} />
                            </>
                        )}
                        {/* Show message when no notes are found */}
                        {!notesLoading && filteredNotes.length === 0 && (
                            <div className="w-full py-4 col-span-3 flex flex-col items-center text-center text-default">
                                {user ? (
                                    <>
                                        <PencilSquareIcon className="size-6" />
                                        <p>No notes found</p>
                                    </>
                                ) : (
                                    <>
                                        <PencilSquareIcon className="size-6" />
                                        <p>Login to create a note</p>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Render filtered notes when they exist */}
                        {filteredNotes.map((note) => {
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