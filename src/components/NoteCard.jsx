import { formatTimestamp } from "../utils/dateUtils";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Link } from 'react-router-dom';
import NoteCardMore from "./NoteCardMore";

function NoteCard({
    deleteNote,
    note,
    ...props
}) {
    return (
        <Card className="bg-background border border-default-100 shadow-lg duration-300" isHoverable>
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
                    <p>{note.content}</p>
                </ScrollShadow>
            </CardBody>
        </Card >
    );
}

export default NoteCard;
