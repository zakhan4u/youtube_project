import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';




const NavBar = async () => {
  const session = await auth();
  return (
    <header className='px-5 py-3 bg-slate-200 shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href="/">
          <Image src="/logo.jpg" width={100} height={20} alt="logo of website" />
        </Link>
        <Link href="/">Home</Link>
        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
            action={async () => {
              "use server";

              await signIn("github");
            }}
          >
            <button type="submit">Login</button>
          </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
