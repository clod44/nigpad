import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Divider, Tabs, Tab, Avatar, Button, Card, CardBody, CardFooter, } from '@nextui-org/react';

export default function Profile() {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth();


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        if (user) {
            setIsAnonymous(user.isAnonymous);
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
            setUser(null);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

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
                                    <div className='flex-grow'>
                                        <p><strong>Name:</strong> {user?.displayName || 'Not set'}</p>
                                        <p><strong>Email:</strong> {user?.email}</p>
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
