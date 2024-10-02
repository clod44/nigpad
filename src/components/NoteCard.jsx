import { formatTimestamp } from "../utils/dateUtils";
import { Card, CardBody, CardFooter, Divider, ScrollShadow, Chip } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import NoteCardMore from "./NoteCardMore";
import Markdown from "react-markdown";

function NoteCard({
    handleDeleteNote,
    note,
    tags,
    ...props
}) {
    if (!note) {
        return null;
    }

    const noteTagTitles = note.tags && note.tags.length > 0 && tags && tags.length > 0
        ? note.tags.map((noteTagId) => {
            const foundTag = tags.find(tag => tag.id === noteTagId);
            return foundTag ? foundTag.title : noteTagId;
        })
        : [];

    return (
        <Card className="bg-background border border-default-100 shadow-lg duration-300" isHoverable isFooterBlurred>
            <Divider />
            <CardBody className="min-h-32 max-h-60">
                <ScrollShadow hideScrollBar className="w-full h-full" size={40}>
                    <Markdown className="markdown">
                        {note?.content.substring(0, 600) + (note.content?.length > 600 ? '...' : '')}
                    </Markdown>
                </ScrollShadow>
            </CardBody>
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 pe-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="w-full flex flex-nowrap items-center">
                    <div className="flex flex-col flex-nowrap flex-grow">
                        <div className="w-full grid grid-cols-12">
                            <Link to={`/note/${note.id}`} className="col-span-12 text-primary hover:text-foreground hover:py-2 duration-300">
                                <ScrollShadow hideScrollBar orientation="horizontal" className="w-full" size={10}>
                                    {console.log('NOOOOTEEEE:', note)}
                                    <p className="text-md text-nowrap">{note.title}</p>
                                    <p className="text-xs text-default-500 text-nowrap col-span-1">{formatTimestamp(note.created?.toDate())}</p>
                                    <div className="flex flex-nowrap mt-1">
                                        {noteTagTitles.map((noteTagTitle) => (
                                            <Chip key={noteTagTitle} size="sm" variant="dot" className="text-xs text-nowrap">
                                                {noteTagTitle}
                                            </Chip>
                                        ))}
                                    </div>
                                </ScrollShadow>
                            </Link>
                        </div>
                    </div>
                    <NoteCardMore id={note.id} handleDeleteNote={handleDeleteNote} />
                </div>
            </CardFooter>
        </Card>
    );
}

export default NoteCard;
