import { useState, useEffect } from 'react';
import { formatTimestamp } from '../utils/dateUtils';
import GetIcon from '../icons/GetIcon';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';


function StatusBar({
    currentNote,
    ...props
}) {
    const [currentTimestamp, setCurrentTimestamp] = useState(() => Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTimestamp(Date.now());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    const detailsContent = (
        <PopoverContent className='border border-default-100 overflow-hidden dark bg-background text-foreground-500' >
            <div className="px-1 py-2">
                {currentNote && (
                    <div className="text-small font-bold text-center">Details</div>
                )}
                <div className="text-tiny">
                    {currentNote && (
                        <>
                            <p>Created: {formatTimestamp(currentNote.timestamp)}</p>
                            <p>Updated: {formatTimestamp(currentNote.lastUpdated)}</p>
                            <p>Characters: {currentNote.content.length}</p>
                            <p>Words: {currentNote.content.split(' ').length}</p>
                            <p>Lines: {currentNote.content.split('\n').length}</p>
                        </>
                    )}
                    <div className='flex flex-row justify-end items-center text-primary gap-1'>
                        <p className='font-bold'>Autosave enabled</p>
                        <GetIcon name="Check" color="primary" />
                    </div>

                </div>
            </div>
        </PopoverContent>
    );

    return (
        <div className="px-4 text-default-500 text-xs flex justify-end flex-nowrap align-middle">

            <Popover >
                <PopoverTrigger>
                    <Button variant='light' color='primary' size='sm' style={{ height: "1.5rem" }}><GetIcon name="Info" strokeWidth={1.5} size={20} />
                        {formatTimestamp(currentTimestamp)}
                    </Button>

                </PopoverTrigger>
                {detailsContent}
            </Popover>

        </div>
    );
}

export default StatusBar;
