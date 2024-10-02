import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { Textarea, Input, Select, SelectItem, Switch, ScrollShadow } from "@nextui-org/react";
import { useNavigate, useParams } from 'react-router-dom';
import GetIcon from "../icons/GetIcon";
import ReactMarkdown from 'react-markdown';
import { getNoteById } from '../services/noteService';

function Edit({
    notes,
    handleUpdateNote,
    tags,
    ...props
}) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isEditing, setIsEditing] = useState(true);

    const acquireNoteData = async (noteId) => {
        const gettingNote = notes?.find(n => n.id === noteId);
        if (gettingNote) return gettingNote;
        return await getNoteById(noteId);
    };

    useEffect(() => {
        const fetchNoteData = async () => {
            if (!id) {
                alert("Note not found");
                navigate('/');
                return;
            }
            const gettingNote = await acquireNoteData(id);
            if (!gettingNote) {
                alert("Note not found");
                navigate('/');
                return;
            }
            setNote(gettingNote);
        };
        fetchNoteData();
    }, [id]);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setSelectedTags(note.tags || []);
            setLoaded(true);
        }
    }, [note]);

    const debouncedHandleUpdateNote = useCallback(
        debounce((id, data) => {
            handleUpdateNote(id, data);
        }, 400),
        [handleUpdateNote]
    );

    useEffect(() => {
        if (loaded && note && isEditing) {
            debouncedHandleUpdateNote(id, { title, content, tags: selectedTags });
        }
    }, [title, content, selectedTags, loaded, isEditing]);

    useEffect(() => {
        return () => {
            debouncedHandleUpdateNote.cancel();
        };
    }, [debouncedHandleUpdateNote]);

    // handlers
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleTagsChange = (e) => setSelectedTags(Array.from(e));

    return (
        <div className="h-full flex flex-col gap-3 p-4 pb-0 overflow-hidden">
            <div className='grid grid-cols-1 sm:grid-cols-4 sm:gap-x-3 gap-x-0 gap-y-2'>
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Title"
                    size="lg"
                    value={title}
                    className='w-full col-span-2'
                    onChange={handleTitleChange}
                    readOnly={!isEditing}
                />
                <div className='col-span-2 flex flex-nowrap gap-x-2'>
                    <Switch size="sm" className='min-w-fit' isSelected={isEditing} onChange={(e) => setIsEditing(e.target.checked)}>Editing</Switch>
                    <div className='min-w-40 w-full'>
                        <Select
                            label="Category"
                            placeholder="School..."
                            selectionMode="multiple"
                            variant='flat'
                            size='sm'
                            selectedKeys={selectedTags}
                            onSelectionChange={handleTagsChange}
                            readOnly={!isEditing}
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
                                <SelectItem key={tag.id}>
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
                            value={content}
                            onChange={handleContentChange}
                            readOnly={!isEditing}
                        />
                    ) : (
                        <ReactMarkdown className="markdown">{content}</ReactMarkdown>
                    )}
                </ScrollShadow>
            </div>
        </div>
    );
}

export default Edit;
