import { Button, Badge } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">

            <Badge content="!" color="warning" className='font-bold' >
                <h1 className="text-5xl font-bold font-mono hover:tracking-widest duration-300">404</h1>

            </Badge>
            <p className="text-lg mt-4">Oops! The page you are looking for doesn't exist.</p>
            <Button as={Link} to="/" className="mt-6 text-lg font-bold" color="primary" variant='ghost'>
                Go Back Home
            </Button>
        </div>
    );
};

export default NotFound;
