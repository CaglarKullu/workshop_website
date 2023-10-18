import Nav from '@/components/Nav'
import { getServerSession } from 'next-auth';
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import prisma from '@/lib/utils/prisma';
import { Role } from '@prisma/client';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
 hello
    </main>
  )
}
