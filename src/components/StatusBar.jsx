import { useState, useEffect } from 'react';
import { formatTimestamp } from '../utils/dateUtils';
import GetIcon from '../icons/GetIcon';
import { Button, Tooltip } from '@nextui-org/react';


function StatusBar({
    ...props
}) {
    const [currentTimestamp, setCurrentTimestamp] = useState(() => Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTimestamp(Date.now());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="px-4 text-default-500 text-xs flex justify-between flex-nowrap items-center">

            <a href="https://github.com/clod44/nigpad" target="_blank" rel="noopener noreferrer">
                <Button variant='light' color='foreground' size='sm' style={{ height: "1.5rem" }}>
                    <GetIcon name='Code' size={20} />
                </Button>
            </a>
            <div className='flex gap-1 flex-nowrap items-center'>
                <GetIcon name="Info" strokeWidth={1.5} size={20} />
                {formatTimestamp(currentTimestamp)}
            </div>



        </div >
    );
}

export default StatusBar;
