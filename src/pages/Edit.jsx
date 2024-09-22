import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Textarea, Input, Select, SelectItem } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { u } from 'framer-motion/client';

function Edit({
    notes,
    updateNote,
    currentNote,
    setCurrentNote,
    tags,
    ...props
}) {
    const { id } = useParams();
    const note = notes.find(note => note.id === id);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //we can't do [note] to also update the titleField and contentField whenever note updates. it creates glitchy ui look with nextui
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setCurrentNote(note);
        }
    }, [id]);
    useEffect(() => {
        setCurrentNote(note || null);
    }, [note]);


    useEffect(() => {
        if (note) {
            updateNote(id, { title, content });
        }
    }, [title, content]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    const handleTagsChange = (e) => {
        const newTags = e.target.value.length > 0 ? e.target.value.split(',') : [];
        updateNote(id, { tags: newTags });
    };
    return (
        <div className="h-full flex flex-col gap-3 p-4 pb-0 overflow-hidden">
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-x-3 gap-y-2'>
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Title"
                    size="lg"
                    value={title}
                    className='w-full col-span-3' // Change from col-auto to col-span-3
                    onChange={handleTitleChange}
                />
                <Select
                    label="Category"
                    placeholder="School..."
                    selectionMode="multiple"
                    className="w-full col-span-1" // This can remain as col-span-1
                    variant='flat'
                    size='sm'
                    defaultSelectedKeys={note?.tags}
                    onChange={(e) => handleTagsChange(e)}
                >
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
