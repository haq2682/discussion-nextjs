'use client';

import { useSession } from "next-auth/react";

export default function Profile() {
    const session = useSession();
    return (
        <>
            {
                session.data?.user ? <div>User is Logged In</div> : <div>User is Logged Out</div>
            }
        </>
    )
}