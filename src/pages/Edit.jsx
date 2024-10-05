import { useEffect, useState, useCallback, useContext } from 'react';
import { debounce } from 'lodash';
import { Textarea, Input, Switch, ScrollShadow } from "@nextui-org/react";
import { useNavigate, useParams } from 'react-router-dom';
import TagsDropdown from "../components/TagsDropdown";
import ReactMarkdown from 'react-markdown';
import { getNoteById } from '../services/noteService';
import { NoteContext } from '../context/NoteContext';
import { notify } from '../context/ToastContext';

function Edit({
    ...props
}) {

    const { notes, tags, handleUpdateNote, handleDeleteNote } = useContext(NoteContext);

    const navigate = useNavigate();
    const { id } = useParams();
    //they create a update cycle
    const [serverNote, setServerNote] = useState(null); //note data from the server
    const [clientNote, setClientNote] = useState(null); //note that is being edited and shown in the UI

    const [canEdit, setCanEdit] = useState(false);
    const [isEditing, setIsEditing] = useState(true);

    const acquireNoteData = async (noteId) => {
        const fetchedNote = notes?.find(n => n.id === noteId);
        setCanEdit(true);
        if (fetchedNote) return fetchedNote;
        //the note wasnt found in user's notes. we will try to get it from the server.
        //the note editing wont work due to permissions but we also disable the ui.
        setCanEdit(false);
        setIsEditing(false);
        notify("You are viewing a stranger's public note.");
        return await getNoteById(noteId);
    };

    useEffect(() => {
        const fetchNoteData = async () => {
            if (!id) {
                notify("Note not found", { type: "error" });
                navigate('/');
                return;
            }
            const fetchedNote = await acquireNoteData(id);
            if (!fetchedNote) {
                notify("Note not found", { type: "error" });
                navigate('/');
                return;
            }
            setServerNote(fetchedNote);
        };
        fetchNoteData();
    }, [id]);

    useEffect(() => {
        if (serverNote) {
            //purify the note's tags from old or undefined tags:
            const validTags = serverNote.tags?.filter(tagId => tags?.some(tag => tag.id === tagId)) || [];
            setClientNote({ ...serverNote, tags: validTags });
        }
    }, [serverNote]);


    const debouncedHandleUpdateNote = useCallback(
        debounce((id, data) => {
            console.log("debouncedHandleUpdateNote", id, data);
            handleUpdateNote(id, data);
        }, 400),
        [handleUpdateNote]
    );

    useEffect(() => {
        if (serverNote) {
            debouncedHandleUpdateNote(id, { ...clientNote });
        }
    }, [clientNote]);

    useEffect(() => {
        return () => {
            debouncedHandleUpdateNote.cancel();
        };
    }, [debouncedHandleUpdateNote]);

    const handleClientDataChange = (data) => {
        if (!clientNote) return;
        setClientNote({ ...clientNote, ...data });
    }


    return (
        <div className="h-full flex flex-col gap-3 p-4 pb-0 overflow-hidden">
            <div className='flex flex-wrap sm:flex-nowrap'>
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Title"
                    size="lg"
                    value={clientNote?.title || ""}
                    className='w-full col-span-2'
                    onChange={(e) => handleClientDataChange({ title: e.target.value })}
                    readOnly={!(isEditing && canEdit)}
                />
                <div className='col-span-1 flex flex-nowrap gap-x-2 items-center'>
                    <Switch
                        size="sm"
                        className='min-w-fit'
                        isSelected={isEditing}
                        onChange={(e) => setIsEditing(e.target.checked)}
                        isDisabled={!canEdit}
                    >
                        Editing
                    </Switch>
                    <Switch
                        size="sm"
                        className='min-w-fit'
                        isSelected={clientNote?.public || false}
                        onChange={(e) => handleClientDataChange({ public: e.target.checked })}
                        isDisabled={!(canEdit && isEditing)}
                    >
                        Public
                    </Switch>
                    <TagsDropdown
                        selectedTags={clientNote?.tags || []}
                        handleSelectedTagsChange={(_tags) =>
                            handleClientDataChange({ tags: _tags })
                        }
                    />
                </div>
            </div>

            <div className="w-full overflow-y-auto">
                <ScrollShadow className="w-full h-full" size={40} hideScrollBar>
                    {isEditing ? (
                        <Textarea
                            variant="bordered"
                            placeholder="..."
                            className="w-full"
                            minRows={30}
                            maxRows={99999}
                            value={clientNote?.content || ""}
                            onChange={(e) => handleClientDataChange({ content: e.target.value })}
                            readOnly={!isEditing}
                        />
                    ) : (
                        <ReactMarkdown className="markdown">{clientNote?.content}</ReactMarkdown>
                    )}
                </ScrollShadow>
            </div>
        </div>
    );
}

export default Edit;
