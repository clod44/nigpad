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
    const selectedTags = note.tags && note.tags.length > 0 && tags && tags.length > 0
        ? tags.filter(tag => note.tags.includes(tag.id))
        : [];

    return (
        <Card className="bg-background border-t-1 border-r-1 border-default shadow-md duration-300 hover:scale-95" isFooterBlurred>
            <Divider />
            <CardBody className="min-h-32 max-h-60">
                <ScrollShadow hideScrollBar className="w-full h-full" size={40}>
                    <Markdown className="markdown">
                        {note?.content.substring(0, 600) + (note.content?.length > 600 ? '...' : '')}
                    </Markdown>
                </ScrollShadow>
            </CardBody>
            <CardFooter className="bg-background dark:bg-transparent justify-between border-default border-1 overflow-hidden py-1 pe-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow ml-1 z-10">
                <div className="w-full flex flex-nowrap items-center">
                    <div className="flex flex-col flex-nowrap flex-grow">
                        <div className="w-full grid grid-cols-12">
                            <Link to={`/note/${note.id}`} className="col-span-12 text-primary hover:text-foreground hover:py-2 duration-300">
                                <ScrollShadow hideScrollBar orientation="horizontal" className="w-full" size={10}>
                                    <p className="text-md text-nowrap">{note.title}</p>
                                    <p className="text-xs text-default-500 text-nowrap col-span-1">{formatTimestamp(note.created?.toDate())}</p>
                                    <div className="flex flex-nowrap mt-1">
                                        {selectedTags.map((tag) => {
                                            console.log("CHIP", tag);
                                            return (
                                                <Chip key={tag.id} size="sm" variant="dot" className="text-xs text-nowrap">
                                                    {tag.title}
                                                </Chip>
                                            );
                                        })}
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
