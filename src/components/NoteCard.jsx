import { formatTimestamp } from "../utils/dateUtils";
import { Card, CardHeader, CardBody, Divider, ScrollShadow, Chip, Tooltip } from "@nextui-org/react";

import { Link } from 'react-router-dom';
import NoteCardMore from "./NoteCardMore";
import Markdown from "react-markdown";
import { useState } from "react";
import { GlobeAmericasIcon } from "@heroicons/react/24/outline";

function NoteCard({
    handleDeleteNote,
    note,
    tags,
    ...props
}) {

    if (!note) {
        return null;
    }
    const [hovering, setHovering] = useState(true);

    const selectedTags = note.tags && note.tags.length > 0 && tags && tags.length > 0
        ? tags.filter(tag => note.tags.includes(tag.id))
        : [];


    return (
        <Card className="bg-default-50 border border-default shadow-md duration-300 hover:border-primary" isFooterBlurred onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <CardHeader className="pe-1 py-1">
                <div className="w-full flex flex-nowrap items-center justify-between pe-0">
                    <div className="flex flex-col flex-nowrap flex-grow overflow-hidden">
                        <Link to={`/note/${note.id}`} className="text-primary hover:text-foreground duration-200 transition-all">
                            <ScrollShadow hideScrollBar orientation="horizontal" size={10} className="w-full h-full">
                                <p className="text-md text-nowrap">
                                    {note.title && note.title.length > 0 ? note.title : 'Untitled'}
                                </p>
                                <div className={`transition-all duration-200 ${hovering ? 'max-h-12' : 'max-h-0'}`}>
                                    <p className="text-xs text-default-500 text-nowrap">{formatTimestamp(note.created?.toDate())}</p>
                                    <div className="flex flex-nowrap mt-1 gap-1">
                                        {note?.public && (
                                            <Tooltip
                                                content="This note is open to public"
                                                placement="right"
                                                color="primary"
                                                showArrow
                                            >
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    color="primary"
                                                    className="text-xs text-nowrap text-primarypx-0">
                                                    <GlobeAmericasIcon className="size-4" />
                                                </Chip>
                                            </Tooltip>
                                        )}
                                        {selectedTags.map((tag) => {
                                            return (
                                                <Chip
                                                    key={tag.id}
                                                    size="sm"
                                                    variant="bordered"
                                                    color={tag.color || "default"}
                                                    className="text-xs text-nowrap border">
                                                    {tag.title}
                                                </Chip>
                                            );
                                        })}
                                    </div>
                                </div>
                            </ScrollShadow>
                        </Link>
                    </div>
                    <NoteCardMore id={note.id} handleDeleteNote={handleDeleteNote} />
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="min-h-32 max-h-60 relative overflow-hidden pb-0">
                <div className="w-full h-full">
                    <Markdown className="markdown">
                        {note?.content.substring(0, 600) + (note.content?.length > 600 ? '...' : '')}
                    </Markdown>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-default-50 pointer-events-none"></div>
            </CardBody>
        </Card >
    );
}

export default NoteCard;
