import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Textarea, Input } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

function Edit({
    notes,
    updateNote,
    currentNote,
    setCurrentNote,
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
            updateNote(id, title, content);
        }
    }, [title, content]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    return (
        <div className="h-full flex flex-col gap-3 p-4 pb-0 overflow-hidden">
            <Input
                type="text"
                variant="underlined"
                placeholder="Title"
                size="lg"
                value={title}
                onChange={handleTitleChange}
            />
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
