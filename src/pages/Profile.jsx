import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Divider } from '@nextui-org/react';

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
                    <p className='text-xs w-full text-center hover:text-lg duration-200 text-red-500 font-bold'>You are logged in as Anonymous. If you log out, you will lose access to this account forever. Feel free to test the application anonymously.</p>
                    <Divider />
                </div>
            )}
            <div className="flex flex-col flex-grow overflow-y-auto p-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                {user ? (
                    <div className="mt-4">
                        <h2 className="text-xl">User Details</h2>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>UID:</strong> {user.uid}</p>
                        <p><strong>Display Name:</strong> {user.displayName || 'Not set'}</p>
                        <p><strong>Photo URL:</strong> {user.photoURL || 'Not set'}</p>
                        <button
                            onClick={handleLogout}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <p>No user is currently logged in.</p>

                )}
            </div >
        </>
    );
}
