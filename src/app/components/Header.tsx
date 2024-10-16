import Link from "next/link"

import { getSignInUrl, withAuth, signOut, } from "@workos-inc/authkit-nextjs";

export default async function Header() {
    const { user } = await withAuth();

    const signInUrl = await getSignInUrl();
    return (
        <header>
            <div className="flex justify-between items-center mt-4 container">
                <Link href="/" className="font-bold text-2xl">Job Board</Link>
                <nav className="flex gap-4 font-semibold">
                    {!user && (
                        <Link href={signInUrl} className="bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 rounded-md">Login</Link>
                    )}
                    <Link href="/new-listing" className="bg-blue-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-md">Post a job</Link>
                    {user && (
                        <form
                            action={async () => {
                                'use server';
                                await signOut();
                            }}
                        >
                            <button type="submit" className="bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 rounded-md">Sign out</button>
                        </form>
                    )}

                </nav>
            </div>
        </header>
    )
}
