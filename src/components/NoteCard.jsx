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
            <CardHeader className="flex gap-3" >
                < div className="w-full flex justify-between" >
                    <div className="grid grid-cols-12 w-full">
                        <Link to={`/note/${note.id}`} className="col-span-11 hover:text-primary " >
                            <ScrollShadow hideScrollBar orientation="horizontal" className="w-full" size={40}>
                                <p className="text-md text-nowrap">{note.title}</p>
                                <p className="text-xs text-default-500 text-nowrap col-span-1">{formatTimestamp(note.timestamp)}</p>
                            </ScrollShadow>
                        </Link>
                    </div>
                    <NoteCardMore id={note.id} deleteNote={deleteNote} />
                </div >
            </CardHeader >
            <Divider />
            <CardBody className="max-h-32">
                <ScrollShadow hideScrollBar className="w-full h-full" size={40}>
                    <p>{note?.content.substring(0, 400) + (note.content.length > 200 ? '...' : '')}</p>
                </ScrollShadow>
            </CardBody>
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 pe-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <ScrollShadow hideScrollBar orientation="horizontal" className="w-full" size={40}>
                    <p className="text-tiny text-foreground-500 text-nowrap">{note.tags.map(noteTag => tags.find(tag => tag.id === noteTag).title).join(', ')}</p>
                </ScrollShadow>
                <Button className="text-tiny text-foreground" variant="faded" color="primary" radius="md" size="sm">
                    Notify me
                </Button>
            </CardFooter>
        </Card >
    );
}

export default NoteCard;
