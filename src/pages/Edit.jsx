import { useEffect, useContext } from 'react';
import { Textarea, Input, Switch, ScrollShadow } from "@nextui-org/react";
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { NoteContext } from '../context/NoteContext';
import { CurrentNoteContext } from '../context/CurrentNoteContext';

export default function Edit(props) {
    const {
        currentNote,
        UpdateCurrentNote,
        showMarkdown,
        SetNewCurrentNoteWithId
    } = useContext(CurrentNoteContext);

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        SetNewCurrentNoteWithId(id);
    }, [id]);

    const handleClientDataChange = (data) => {
        if (!currentNote) return;
        UpdateCurrentNote(data);
    };

    return (
        <div className="h-full flex flex-col gap-3 p-4 pb-0 overflow-hidden">
            <div className="w-full overflow-y-auto">
                <ScrollShadow className="w-full h-full" size={40} hideScrollBar>
                    {!showMarkdown ? (
                        <Textarea
                            variant="bordered"
                            placeholder="..."
                            className="w-full"
                            minRows={30}
                            maxRows={99999}
                            value={currentNote?.content || ""}
                            onChange={(e) => handleClientDataChange({ content: e.target.value })}
                        />
                    ) : (
                        <ReactMarkdown className="markdown">{currentNote?.content}</ReactMarkdown>
                    )}
                </ScrollShadow>
            </div>
        </div>
    );
}
