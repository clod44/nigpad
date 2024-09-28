import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Textarea, Input, Select, SelectItem } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useNavigate } from 'react-router-dom';
import GetIcon from "../icons/GetIcon";

function Edit({
    notes,
    updateNote,
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

    useEffect(() => {
        setLoaded(false);
        if (!id) {
            alert("Note not found");
            navigate('/');
            return;
        }
        const gettingNote = notes.find(n => n.id === id);
        if (!gettingNote) {
            alert("Note not found");
            navigate('/');
            return;
        }
        setNote(gettingNote);

        setTitle('');
        setContent('');
        setSelectedTags([]);
    }, [id]);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            if (!note.tags) {
                setSelectedTags([]);
            } else {
                setSelectedTags(note.tags);
                console.log("selected tags: ", note.tags);
            }
            setLoaded(true);
        }
    }, [note]);


    useEffect(() => {
        if (loaded && note) {
            //console.log("saving note: ", note);
            updateNote(id, { title, content, tags: selectedTags });
            //console.log("note saved:", note);
        }
    }, [title, content, selectedTags, loaded]);



    // handlers
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleTagsChange = (e) => setSelectedTags(Array.from(e));

    return (
        <div className="h-full flex flex-col gap-3 p-4 pb-0 overflow-hidden">
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-x-3 gap-y-2'>
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Title"
                    size="lg"
                    value={title}
                    className='w-full col-span-3'
                    onChange={handleTitleChange}
                />
                <Select
                    label="Category"
                    placeholder="School..."
                    selectionMode="multiple"
                    className="w-full col-span-1"
                    variant='flat'
                    size='sm'
                    selectedKeys={selectedTags}
                    onSelectionChange={handleTagsChange}
                >
                    <SelectItem
                        key={"EditTags"}
                        value={"EditTags"}
                        textValue="Edit tags"
                        variant="faded"
                        startContent={<GetIcon name="Edit" />}
                        showDivider
                        href="/Tags"
                    >
                        Edit Tags
                    </SelectItem>

                    {tags.map((tag) => (
                        <SelectItem key={tag.id}>
                            {tag.title}
                        </SelectItem>
                    ))}

                </Select>
            </div>

            <div className="w-full overflow-y-auto">
                <ScrollShadow className="w-full h-full" size={40} hideScrollBar>
                    <Textarea
                        variant="bordered"
                        placeholder="..."
                        className="w-full"
                        minRows={30}
                        maxRows={99999}
                        value={content}
                        onChange={handleContentChange}
                    />
                </ScrollShadow>
            </div>
        </div>
    );
}

export default Edit;
