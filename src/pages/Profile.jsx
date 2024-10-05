import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import useAuth from "../hooks/useAuth";
import { Divider, Tabs, Tab, Avatar, Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react';
import { updateDisplayName } from '../services/userService';
import { logout } from '../services/authService';

export default function Profile() {
    const { auth, user } = useAuth();
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (user) {
            setIsAnonymous(user.isAnonymous);
            setName(user.displayName || 'Not Set');
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
    };

    const handleSaveProfileChanges = async () => {
        await updateDisplayName(name);
    }
    return (
        <>
            {isAnonymous && (
                <div className='px-2 bg-black'>
                    <p className='text-xs w-full text-center hover:text-lg duration-200 text-danger font-bold'>You are logged in as Anonymous. If you log out, you will lose access to this account forever. Feel free to test the application anonymously.</p>
                    <Divider />
                </div>
            )}
            <div className="flex flex-col flex-grow overflow-y-auto p-4 items-center">
                <Tabs centered variant='underlined'>
                    <Tab key="profile" title="Profile">
                        <Card className='bg-background shadow-lg border border-default'>
                            <CardBody>
                                <div className='p-4 flex gap-5 items-center flex-wrap justify-center mb-4'>
                                    <Avatar src={user?.photoURL} className="w-40 h-40 text-large" isBordered color='primary' />
                                    <div className='flex-grow flex flex-col gap-3'>
                                        <Input type="text" label="Name" variant='underlined' value={name} onChange={(e) => setName(e.target.value)} />
                                        <Input type="email" label="Email" variant='underlined' value={user?.email || 'No Email'} readOnly />
                                        <Button onClick={handleSaveProfileChanges} size='sm' variant='light' color='primary'>Save Changes</Button>
                                    </div>
                                </div>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <Button className='w-full' size='sm' variant="flat" color="danger" onClick={handleLogout}>Logout</Button>
                            </CardFooter>

                        </Card>
                    </Tab>
                    <Tab key="settings" title="Settings">
                        <div>
                            No settings
                        </div>
                    </Tab>
                </Tabs>

            </div >
        </>
    );
}
