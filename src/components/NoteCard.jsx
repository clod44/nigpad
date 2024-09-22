import { formatTimestamp } from "../utils/dateUtils";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Link } from 'react-router-dom';
import NoteCardMore from "./NoteCardMore";

function NoteCard({
    deleteNote,
    note,
    tags,
    ...props
}) {
    return (
        <Card className="bg-background border border-default-100 shadow-lg duration-300" isHoverable
            isFooterBlurred>
            <Divider />
            <CardBody className="min-h-32 max-h-60">
                <ScrollShadow hideScrollBar className="w-full h-full" size={40}>
                    <p className="text-foreground-500">{note?.content.substring(0, 600) + (note.content.length > 600 ? '...' : '')}</p>
                </ScrollShadow>
            </CardBody>
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 pe-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="w-full flex gap-2 flex-nowrap items-center">
                    <div className="flex flex-col gap-2 flex-nowrap flex-grow">
                        <div className="w-full grid grid-cols-12">
                            <Link to={`/note/${note.id}`} className="col-span-11 text-primary hover:text-foreground hover:py-2 duration-300" >
                                <ScrollShadow hideScrollBar orientation="horizontal" className="w-full" size={40}>
                                    <p className="text-md text-nowrap">{note.title}</p>
                                    <p className="text-xs text-default-500 text-nowrap col-span-1">{formatTimestamp(note.timestamp)}</p>
                                    <p className="text-tiny text-foreground-500 text-nowrap">{note.tags.map(noteTag => tags.find(tag => tag.id === noteTag).title).join(', ')}</p>
                                </ScrollShadow>
                            </Link>
                        </div>

                    </div>
                    <NoteCardMore id={note.id} deleteNote={deleteNote} />
                </div>
            </CardFooter>
        </Card >
    );
}

export default NoteCard;
