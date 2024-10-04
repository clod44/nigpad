import { useEffect, useState, useCallback, useContext } from 'react';
import { debounce } from 'lodash';
import { Textarea, Input, Select, SelectItem, Switch, ScrollShadow } from "@nextui-org/react";
import { useNavigate, useParams } from 'react-router-dom';
import GetIcon from "../icons/GetIcon";
import ReactMarkdown from 'react-markdown';
import { getNoteById } from '../services/noteService';
import { NoteContext } from '../context/NoteProvider';

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
        alert("You are viewing a stranger's public note.");
        return await getNoteById(noteId);
    };

    useEffect(() => {
        const fetchNoteData = async () => {
            if (!id) {
                alert("Note not found");
                navigate('/');
                return;
            }
            const fetchedNote = await acquireNoteData(id);
            if (!fetchedNote) {
                alert("Note not found");
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
            <div className='grid grid-cols-1 md:grid-cols-4 sm:gap-x-3 gap-x-0 gap-y-2'>
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
                <div className='col-span-2 flex flex-nowrap gap-x-2'>
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
                    <div className='min-w-40 w-full'>
                        <Select
                            label="Category"
                            placeholder="School..."
                            selectionMode="multiple"
                            variant='flat'
                            size='sm'
                            selectedKeys={clientNote?.tags || []}
                            onSelectionChange={(e) => handleClientDataChange({ tags: Array.from(e) })}
                            readOnly={!(isEditing && canEdit)}
                            isDisabled={!canEdit}
                        >
                            <SelectItem
                                key={"EditTags"}
                                value={"EditTags"}
                                textValue="Edit tags"
                                variant="faded"
                                startContent={<GetIcon name="Edit" />}
                                showDivider
                                href="/tags"
                            >
                                Edit Tags
                            </SelectItem>
                            {tags?.map((tag) => (
                                <SelectItem key={tag.id} value={tag.id}>
                                    {tag.title}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
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
